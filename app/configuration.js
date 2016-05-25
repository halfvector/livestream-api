/**
 * API Configuration
 *
 */
'use strict';

var path = require('path');
var _ = require('lodash');

var configs = {
    // Local development environment
    localhost: {
        secrets: {
            some_api_key: 'key'
        },
        port: 9000,
        db: 'mysql://localhost/livestream-api-development'
    },

    // Staging Environment
    staging: {
        port: 9000,
        db: 'mysql://staging.server/livestream-api-staging'
    },

    // Production environment
    production: {
        port: 9000,
        db: 'mysql://production.server/livestream-api-production'
    }
};

var general = {
    // Default to local development environment
    environment: process.env.NODE_ENV || 'localhost',

    // Root path for server
    root: path.normalize(__dirname),
}

// Merge generic configuration with specified configuration
module.exports = _.merge(general, configs[general.environment]);
