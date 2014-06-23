/**
 * Created by alex on 08.06.2014.
 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sftp = require('gulp-sftp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

// connect klappt zwar, aber mysql liefert auf :4242 keine Daten???
gulp.task('default', [/*'connect', */'watch'], function() {
    gulp.start('build_dev');
});

gulp.task('prod', function() {
    gulp.start('styles', 'scripts');
});

gulp.task('build_dev', ['styles_dev', 'scripts_dev'], function() {
    gulp.start('move_dev');
});

gulp.task('styles', function() {
    return gulp.src(['style/apflora.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('style'))
        .pipe(notify({message: 'css task beendet'}));
});

gulp.task('styles_dev', function() {
    return gulp.src(['style/apflora.css'])
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('style'))
        .pipe(notify({message: 'css dev task beendet'}));
});

gulp.task('scripts', function() {
    return gulp.src(['src/jquery-ui.js', 'src/jquery.ui.touch-punch.js', 'src/jquery.cookie.js', 'src/jquery.hotkeys.js', 'src/hammer.js', 'src/jquery.hammer.js', 'src/markerclusterer.js', 'src/markerwithlabel.js', 'src/ruler.js', 'src/jsuri.js', 'src/shapefile/shapefile.js', 'src/shapefile/stream.js', 'src/shapefile/dbf.js', 'src/apflora.js', 'src/jquery.file.download.js', 'src/underscore.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src'))
        .pipe(notify({ message: 'Scripts task beendet' }));
});

gulp.task('scripts_dev', function() {
    return gulp.src(['src/jquery-ui.js', 'src/jquery.ui.touch-punch.js', 'src/jquery.cookie.js', 'src/jquery.hotkeys.js', 'src/hammer.js', 'src/jquery.hammer.js', 'src/markerclusterer.js', 'src/markerwithlabel.js', 'src/ruler.js', 'src/jsuri.js', 'src/shapefile/shapefile.js', 'src/shapefile/stream.js', 'src/shapefile/dbf.js', 'src/apflora.js', 'src/jquery.file.download.js', 'src/underscore.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('src'))
        .pipe(notify({ message: 'Scripts task beendet' }));
});

gulp.task('sftp', function() {
    gulp.start('sftp_index', 'sftp_src', 'sftp_style', 'sftp_php');
});

gulp.task('move_dev', ['clean_dev'], function() {
    gulp.start('move_dev_index', 'move_dev_src', 'move_dev_style', 'move_dev_php');
});

gulp.task('sftp_src', function() {
    return gulp.src('src/*')
        .pipe(sftp({
            host: '146.185.161.6',
            auth: 'keyMain',
            authFile: '.ftppass',
            port: 30000,
            remotePath: '/var/zpanel/hostdata/zadmin/public_html/apflora_ch/src'
        }));
});

gulp.task('move_dev_src', function() {
    return gulp.src(['src/**', 'src/img/**', 'src/shapefile/**', 'src/theme/**', 'src/themes/**'], {base: 'src/'})
        .pipe(gulp.dest('../programme/xampp/htdocs/apflora/src'));
});

gulp.task('clean_dev', function() {
    return gulp.src(['../programme/xampp/htdocs/apflora/src/*', '../programme/xampp/htdocs/apflora/style/*', '../programme/xampp/htdocs/apflora/php/*', '../programme/xampp/htdocs/apflora/index.html'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('sftp_style', function() {
    return gulp.src('style/*')
        .pipe(sftp({
            host: '146.185.161.6',
            auth: 'keyMain',
            authFile: '.ftppass',
            port: 30000,
            remotePath: '/var/zpanel/hostdata/zadmin/public_html/apflora_ch/style'
        }));
});

gulp.task('move_dev_style', function() {
    return gulp.src(['style/*', 'style/images/*', 'style/images_alt/*'], {base: 'style/'})
        .pipe(gulp.dest('../programme/xampp/htdocs/apflora/style'));
});

gulp.task('sftp_php', function() {
    return gulp.src('php/*')
        .pipe(sftp({
            host: '146.185.161.6',
            auth: 'keyMain',
            authFile: '.ftppass',
            port: 30000,
            remotePath: '/var/zpanel/hostdata/zadmin/public_html/apflora_ch/php'
        }));
});

gulp.task('move_dev_php', function() {
    return gulp.src('php/*')
        .pipe(gulp.dest('../programme/xampp/htdocs/apflora/php'))
        .pipe(connect.reload());
});

gulp.task('sftp_index', function() {
    return gulp.src('index.html')
        .pipe(sftp({
            host: '146.185.161.6',
            auth: 'keyMain',
            authFile: '.ftppass',
            port: 30000,
            remotePath: '/var/zpanel/hostdata/zadmin/public_html/apflora_ch/'
        }));
});

gulp.task('move_dev_index', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('../programme/xampp/htdocs/apflora/'));
});

// siehe hier: http://symmetrycode.com/super-simple-static-server-in-gulp
// aber klappt leider nicht
gulp.task('connect', function() {
    connect.server({
        root: '../programme/xampp/htdocs/apflora/',
        port: 4242,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(['**', '-src/main.js', '-style/apflora.min.css'] ['build_dev']);
});