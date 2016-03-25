var gulp = require('gulp');
var sass = require('gulp-sass');//sass监听
var concat = require('gulp-concat');//
var autoprefixer = require('gulp-autoprefixer');

gulp.task('listenSass',function(){
    gulp.src(['./css/style.scss'])
		.pipe(sass())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4','opera'))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./dealed')); 
});




gulp.task('watchAll',['listenSass'],function(){
	 gulp.watch('./css/style.scss',function(){
	 	gulp.run('listenSass');
	 });
});