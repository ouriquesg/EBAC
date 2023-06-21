const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imgmin = require('gulp-imagemin');

function compressedIMG(){
    return gulp.src('./source/img/*')
        .pipe(imgmin())
        .pipe(gulp.dest('./build/img'))
}
function compressedJS(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}
function compressedSASS(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compressedSASS));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(compressedJS));
    gulp.watch('./source/img/*', {ignoreInitial: false}, gulp.series(compressedIMG));
}