const gulp = require('gulp');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');

const path = {
  source: './source/**/*.{jpg,gif,png,svg}',
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

gulp.task('imagemin', () => gulp.src(path.source)
  .pipe(imagemin(imageminPlugins, { verbose: true }))
  .pipe(gulp.dest(path.dest))
);

gulp.task('default', cb => runSequence(
  'clean',
  'imagemin',
  cb,
));

