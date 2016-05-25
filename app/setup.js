/**
 * Setup express server.
 */

'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var _ = require('lodash');

module.exports = function (app, config) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(logger('dev'));
    app.use(errorHandler()); // Error handler - has to be last
};
