/**
 * beamt die Dateien aus dem dist-Ordner nach apflora.ch
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';


var gulp       = require('gulp'),
    sftp       = require('gulp-sftp'),
    requireDir = require('require-dir'),
    sftpPass   = require('../sftpPass.json');

requireDir('../gulp-tasks', {recurse: true});

return gulp.task('prod_sftp', ['prod_sftp_sftp'], function () {
    gulp.start('prod_clean_dist');
});