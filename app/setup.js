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
var expressValidator = require('express-validator');
var _ = require('lodash');

module.exports = function (app, config) {
    var customValidators = {
        isArray: function (value) {
            return Array.isArray(value);
        }
    }

    app.use(bodyParser.json());
    app.use(expressValidator({'customValidators': customValidators}));
    app.use(methodOverride());
    app.use(cookieParser());
    if(!config.underTest) {
        app.use(logger('dev'));
    }
    app.use(errorHandler()); // Error handler - has to be last
};
