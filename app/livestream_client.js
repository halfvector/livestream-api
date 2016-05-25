/**
 * Livestream API Client
 *
 * returns Blurbird promises of json
 * use .then()/.catch() to handle success and error states
 */
var rp = require('request-promise');

module.exports = {
    getAccountDetails: function (userId) {
        var request = {
            uri: 'https://api.new.livestream.com/accounts/' + userId,
            json: true
        };

        return rp(request);
    }
}