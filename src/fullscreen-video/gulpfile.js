const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');

const cssTask = () => src('./css/**/*.scss')
    .pipe(gulpStylelint({
        reporters: [
            {
                formatter: 'string',
                console: true
            }
        ]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css/'));

const serveTask = (done) => {
    browserSync.init({
        server: {
            baseDir: './'
        },
    }, done);
};

const watchFilesTask = (done) => {
    watch('./css/**/*.scss', series(cssTask, liveReload));
    watch('./*.html', liveReload);
    watch('./js/**/*.js', liveReload);

    done();
}

const liveReload = (done) => {
    browserSync.reload();
    done();
};

exports.default = series(
    cssTask,
    serveTask,
    watchFilesTask,
);
