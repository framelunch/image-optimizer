const gulp = require('gulp');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const fs = require('fs-extra');
const globby = require('globby');
const prettyBytes = require('pretty-bytes');

const filepattern = '**/*.{jpg,gif,png,svg}';
const path = {
  source: './source/',
  dest: './dest/',
};

const imageminPlugins = [
  // https://www.npmjs.com/package/imagemin-pngquant
  pngquant({
    quality: '65-80',
    speed: 1,
    floyd: 0,
    verbose: true,
  }),
  // https://www.npmjs.com/package/imagemin-mozjpeg
  mozjpeg({
    quality: 85,
  }),
  // https://github.com/svg/svgo#what-it-can-do
  imagemin.svgo(),
  imagemin.optipng(),
  imagemin.gifsicle({ optimizationLevel: 3 }),
];

gulp.task('clean', cb => rimraf(path.dest, {}, cb));

gulp.task('imagemin', () => gulp.src(path.source + filepattern)
  .pipe(imagemin(imageminPlugins, { verbose: true }))
  .pipe(gulp.dest(path.dest)));

gulp.task('createinfo', cb => {
  const info = globby.sync(path.source + filepattern)
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
      });
      return tmpInfo;
    }, []);

  fs.writeFileSync(`${path.dest}info.json`, JSON.stringify(info));

  cb();
});

gulp.task('default', cb => runSequence(
  'clean',
  'imagemin',
  'createinfo',
  cb,
));
