const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss=require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
const del=require('del');
//var uglifyjs=require('gulp-uglify');
const pump=require('pump');
const concat=require('gulp-concat');
const runSequence=require('run-sequence');
const sourcemaps=require('gulp-sourcemaps');
const babel=require('gulp-babel');

gulp.task('clean',function(){
	return del.sync('prod');
});
gulp.task('compressjs', function (cb) {
	 pump([
		 gulp.src('source/js/scripts.js'),
		 sourcemaps.init(),
		 babel(),
		 concat('scripts.js'),		 
		 sourcemaps.write('.'),
		 gulp.dest('prod/ui'),
		 browserSync.reload({stream: true})
	 ],
	cb
 );
});

gulp.task('sass_compress', function() {
  return gulp.src('source/scss/style.scss')
    .pipe(sass())	// Converts Sass to CSS with gulp-sass
	.pipe(uglifycss()) //compress css
	.pipe(gulp.dest('prod/ui'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('copy', function () {
	gulp.src('source/*.html')
	.pipe(gulp.dest('prod'))
	.pipe(browserSync.reload({
		stream: true
	}));
//	gulp.src('source/js/*.js')
//	.pipe(gulp.dest('prod/ui'))
//	.pipe(browserSync.reload({
//		stream: true
//	}));
		
	gulp.src('source/img/*.*')
	.pipe(gulp.dest('prod/img'))
	.pipe(browserSync.reload({
		stream: true
	}));
	
	gulp.src('source/scss/font-awesome/**/*.*')
	.pipe(gulp.dest('prod/ui/font-awesome'));	
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: { baseDir: 'prod' }
			});
});

gulp.task('build', function(done){
	runSequence('clean',['copy','sass_compress','compressjs','browserSync'],done);
	
});

gulp.task('default',['build'], function(){
	gulp.watch(['source/scss/style.scss','source/scss/partials/*.scss'], ['sass_compress']);
	gulp.watch('source/*.html', ['copy']);
	gulp.watch('source/js/*.js', ['compressjs']);
	gulp.watch('source/img/*.*', ['copy']);
});

