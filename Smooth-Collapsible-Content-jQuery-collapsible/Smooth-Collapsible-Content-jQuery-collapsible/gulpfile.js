/**
 * --------------------
 * Dependencies
 * --------------------
 */
var del         	= require('del');
var gulp        	= require('gulp');
var sass        	= require('gulp-sass');
var minify 			= require('gulp-minify');
var sourcemaps 		= require('gulp-sourcemaps');
var autoprefixer 	= require('gulp-autoprefixer');
var browserSync 	= require('browser-sync').create();


/**
 * --------------------
 *  Config
 * --------------------
 */
var config = {
	src				: 'src',
	dist			: 'dist',

	assets 			: '/assets',
	css 			: '/css',
	sass 			: '/sass',
	style 			: 'jquery.collapsible.demo.css',

	js 				: '/js'
};



// Watch SASS files
gulp.task('watch:sass', function () {
	return gulp.watch([
		config.src+config.sass+'/*.scss',
		config.src+config.sass+'/**/*.scss'
	], ['sass']);
});


// Watch JS files
gulp.task('watch:js', function () {
	return gulp.watch([config.src+config.js+'/jquery.collapsible.js'], ['js']);
});


// Watch all
gulp.task('watch', [
	'watch:sass',
	'watch:js'
]);


/**
 * --------------------
 * Build Tasks
 * --------------------
 */
gulp.task('js', function () {
	return gulp.src([config.src+config.js+'/*.js'])
		.pipe(gulp.dest(config.dist+config.js));
});


// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(config.src+config.sass+"/*.scss")
        .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
        .pipe(gulp.dest(config.dist+config.css))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.src+config.css))
        .pipe(browserSync.stream());
});


// Build
gulp.task('build', ['js', 'sass']);


// Default gulp task
gulp.task('default', ['build', 'watch'], function() {
    browserSync.init({
		server: "./"+config.src,
		notify: false,
		ghostMode: false
	});

    return gulp.watch(config.src + "/**").on('change', browserSync.reload);
});
