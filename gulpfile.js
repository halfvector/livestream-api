var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', [], function () {
    var options = {
        script: 'start.js',
        ext: 'js'
    };

    return nodemon(options).on('restart', [], function (env) {
        console.log('Restarted', env);
    });
});


gulp.task('default', ['serve']);