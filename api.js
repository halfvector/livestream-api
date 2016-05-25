/**
 * Create Express app
 *
 * Server can be started standalone using start.js
 * Or via supertest by mocha
 */

'use strict';

var express = require('express');
var path = require('path');
var glob = require('glob');

var config = require('./app/configuration');

var app = express();
var server = require('http').createServer(app);

// Configure express server
require('./app/setup')(app, config);

/**
 * Mount resource endpoints.
 */
app.use('/directors', require('./app/resources/directors.js'));

// Ping health-check for load balancer and server monitors.
app.get('/ping', function (req, res) {
    res.status(200).json({result: 'Pong'});
});

// Return 404 when an unrecognized route is hit.
app.use(function (req, res) {
    res.status(404).json({error: 'Not found'});
});

// Expose app
module.exports = app;