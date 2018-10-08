const gulp				= require('gulp');
const sourcemaps		= require('gulp-sourcemaps');
const autoprefixer		= require('gulp-autoprefixer');
const concat 			= require('gulp-concat');
const browserSync 		= require('browser-sync').create();
const sass        		= require('gulp-sass');
const cleanCSS 			= require('gulp-clean-css');
const imagemin 			= require('gulp-imagemin');
const uglify 			= require('gulp-uglify');
const pump 				= require('pump');



gulp.task('default', () => {
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('app/dist/all.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("app/dist/css"))
});

gulp.task('autoprefixer', () => {
    return gulp.src('app/dist/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/dist/all.css'))
});

gulp.task('imagemin', () => {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/dist/img'))
});

gulp.task('compress', (cb) => {
  pump([
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('app/dist/js')
    ],
    cb
  );
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['minify-css' ,'autoprefixer' ,'imagemin', 'compress', 'serve']);