module.exports = {
  // https://www.npmjs.com/package/imagemin-pngquant
  png: {
    quality: '65-80',
    speed: 1,
    floyd: 0,
    verbose: true,
  },
  // https://www.npmjs.com/package/imagemin-mozjpeg
  jpg: {
    quality: 80,
  },
  // https://github.com/imagemin/imagemin-gifsicle#imagemingifsicleoptionsbuffer
  gif: {
    optimizationLevel: 3
  },
  // https://github.com/svg/svgo#what-it-can-do
  svg: {
  },
};
