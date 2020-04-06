const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');
const concat = require('gulp-concat');

function style() {
  return gulp
    .src('./scss/main.scss')
    .pipe(gulpStylelint({ reporters: [{ formatter: 'string', console: true }] }))
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  style();
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch(['./*.html', './index.js']).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
