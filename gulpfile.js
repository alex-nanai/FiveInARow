var gulp = require('gulp'),
    bundle = require('gulp-bundle-assets'),
    rename = require('gulp-rename');
 
gulp.task('bundle', function() {
  return gulp.src('./bundle.config.js')
    .pipe(bundle("", { minify: false }))
    .pipe(rename('bundledScripts.js'))
    .pipe(gulp.dest('./bundles'));
});

gulp.task('default',['bundle']);