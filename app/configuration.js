/**
 * API Configuration
 */
'use strict';

var path = require('path');
var _ = require('lodash');

var configs = {
    // Local development environment
    localhost: {
        http: {
            port: 9000,
        },
        db: {
            host: 'localhost',
            database: 'livestream_api_localhost',
            username: 'root',
            password: ''
        }
    },

    // Local automated test environment (tdd, build-server)
    testing: {
        underTest: true,
        http: {
            port: 9000,
        },
        db: {
            host: 'localhost',
            database: 'livestream_api_testing',
            username: 'root',
            password: '',
            logging: false
        }
    },

    // Staging Environment (unused)
    staging: {
        http: {
            port: 9000,
        },
        db: {
            host: 'staging.server',
            database: 'livestream_api_staging'
        }
    },

    // Production environment (unused)
    production: {
        http: {
            port: 9000,
        },
        db: {
            host: 'production.server',
            database: 'livestream_api_production'
        }
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
