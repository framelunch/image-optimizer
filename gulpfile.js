const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const ejs = require('gulp-ejs');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const fs = require('fs-extra');
const globby = require('globby');
const prettyBytes = require('pretty-bytes');
const browser = require('browser-sync');
const customProperties = require('postcss-custom-properties');
const nested = require('postcss-nested');
const importCss = require('postcss-import');
const customMedia = require('postcss-custom-media');
const cssFixes = require('postcss-fixes');
const autoprefixer = require('autoprefixer');

const config = require('./config');

const filepattern = {
  image: '**/*.{jpg,gif,png,svg}',
  view: '**/*.ejs',
  style: '**/*.css',
};
const path = {
  source: './source/',
  lib: './lib/',
  dest: './dest/',
};

const imageminPlugins = [
  pngquant(config.png),
  imagemin.optipng(),
  mozjpeg(config.jpg),
  imagemin.svgo(config.svg),
  imagemin.gifsicle(config.gif),
];

gulp.task('clean', cb => rimraf(path.dest, {}, cb));

gulp.task('imagemin', () => gulp.src(path.source + filepattern.image)
  .pipe(imagemin(imageminPlugins, { verbose: true }))
  .pipe(gulp.dest(path.dest)));

gulp.task('createinfo', cb => {
  const info = globby.sync(path.source + filepattern.image)
    .reduce((tmpInfo, filename) => {
      const removeSourceDirName = filename.replace(new RegExp(path.source), '');
      const destname = path.dest + removeSourceDirName;
      const sourceByteSize = fs.statSync(filename).size;
      const destByteSize = fs.statSync(destname).size;
      // eslint-disable-next-line no-param-reassign
      tmpInfo.push({
        filename: removeSourceDirName,
        sourceByteSize,
        destByteSize,
        sourceSize: prettyBytes(sourceByteSize),
        destSize: prettyBytes(destByteSize),
        compressRatio: Math.round((destByteSize / sourceByteSize) * 10000) / 100,
      });
      return tmpInfo;
    }, []);

  fs.writeFileSync(`${path.dest}info.json`, JSON.stringify(info));

  cb();
});

gulp.task('view', () => {
  const fileinfo = JSON.parse(fs.readFileSync(`${path.dest}info.json`));
  const avarageRatio = Math.round(fileinfo.reduce((tmp, { compressRatio }) => tmp += compressRatio, 0) / fileinfo.length * 100) / 100;
  gulp.src(path.lib + filepattern.view)
    .pipe(ejs({
      fileinfo,
      avarageRatio,
      sourcePath: path.source,
    }, {}, { ext: '.html' }))
    .pipe(gulp.dest(path.dest));
});

gulp.task('style', () => gulp.src(path.lib + filepattern.style)
  .pipe(postcss([
    importCss,
    customProperties,
    customMedia,
    nested,
    cssFixes,
    autoprefixer,
  ]))
  .pipe(gulp.dest(path.dest)));

gulp.task('server', () => browser.init(null, {
  notify: false,
  port: 9753,
  server: {
    baseDir: ['dest'],
    routes: {
      '/source/': 'source',
    },
  },
}));

gulp.task('compress', cb => runSequence(
  'clean',
  'imagemin',
  'createinfo',
  cb,
));

gulp.task('default', cb => runSequence(
  'compress',
  ['view', 'style'],
  'server',
  cb,
));
