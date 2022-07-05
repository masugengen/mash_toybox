const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const gulpHeader = require('gulp-header');
const gulpReplace = require('gulp-replace');
const mqpacker = require('mqpacker');

const paths = {
  scss: {
    src: ['./src/assets/styles/**/*.scss','!./src/assets/styles/**/_*.scss'],
    dest: 'public/assets/styles'
  }
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
      outputStyle : 'compressed'
    }))
    .pipe(postcss(
      [
        autoprefixer(),
        mqpacker()
      ]
    ))
    .pipe(gulpReplace(/@charset "UTF-8";/g, ''))
    .pipe(gulpHeader('@charset "UTF-8";'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(debug({title: 'scss dest:'}));
}

exports.default = scss;

const watch = () => gulp.watch('./src/assets/styles/**/*.scss',scss);

exports.watch = watch;
