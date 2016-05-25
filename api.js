/**
 * API Server entrypoint
 */

'use strict';

var express = require('express');
var config = require('./app/configuration');
var path = require('path')
var glob = require('glob')

var app = express();
var server = require('http').createServer(app);

// Configure express server
require('./app/setup')(app, config);

console.dir(config.stormpath);

/**
 * Load all resources
 */
require('./app/resources/directors.js')(app);

// Ping health-check for load balancer and server monitors
app.get('/ping', function (req, res) {
    res.json(200, {result: 'Pong'});
});

// Return nice 404 when an unrecognized route is hit.
app.use(function (req, res, next) {
    console.log("Hit 404 route handler");
    res.json(404, {error: 'Not found'});
});

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;