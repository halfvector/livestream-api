/**
 * Standalone API Server entrypoint
 */

var config = require('./app/configuration');
var db = require('./app/models');
var api = require('./api');

// Connect to and sync database, then start listening for http connections.
db.sequelize
    .sync()
    .then(function () {
        api.listen(config.http.port, function () {
            console.log('Express server listening on :%d in %s environment', config.http.port, api.get('env'));
        });
    })
    .catch(function (e) {
        throw new Error(e);
    });