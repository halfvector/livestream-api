// Enable testing environment to use different database and debugging mode
process.env.NODE_ENV = 'testing';

var db = require('../app/models');
var chai = require('chai');
var chaiPromises = require('chai-as-promised');
var supertest = require('supertest-as-promised');
chai.use(chaiPromises);

var should = chai.should;
var expect = chai.expect;

// Create API server
var server = require('../api.js');

// Start client that manages API server lifecycle
var client = supertest(server);

describe('Resource /directors', function () {
    before(function () {
        // Sync DB: run migrations and truncate previous tests' data
        return db.sequelize.sync()
            .then(function () {
                return Promise.all([
                    db.FavoriteMovies.destroy({where: {}}),
                    db.Movie.destroy({where: {}}),
                    db.Director.destroy({where: {}})
                ]);
            })
    });

    this.timeout(10000); // 10 second timeout
    this.slow(2000); // mark tests taking >2 seconds as slow

    it('GET should return 404 when invalid url specified', function () {
        return client
            .get('/non-existent-url')
            .expect(404);
    });

    it('POST should return 400 when body missing livestream_id', function () {
        return client
            .post('/directors')
            .send({})
            .expect(400);
    });

    it('POST should return 404 when livestream_id not found by remote Livestream Accounts API', function () {
        return client
            .post('/directors')
            .send({
                livestream_id: 648881800
            })
            .expect(404);
    });

    it('POST should return 200 when body contains valid livestream_id', function () {
        return client
            .post('/directors')
            .send({
                livestream_id: 6488818
            })
            .expect(200);
    });

    it('GET should return 400 if livestream_id is not an integer', function () {
        return client
            .post('/directors')
            .send({
                livestream_id: "not an int"
            })
            .expect(400);
    });

    it('GET should return 404 when livestream_id is not found in db', function () {
        return client
            .get('/directors/12345')
            .expect(404);
    });

    it('GET should return 200 when livestream_id is found in db', function () {
        return client
            .get('/directors/6488818')
            .expect(200);
    });

    it('PUT should return 404 when livestream_id is not found in db', function () {
        return client
            .put('/directors/12345')
            .send({
                favorite_camera: 'Nikon'
            })
            .expect(404);
    });

    it('PUT should return 200 when livestream_id is found in db', function () {
        return client
            .put('/directors/6488818')
            .send({
                favorite_camera: 'Nikon'
            })
            .expect(200);
    });

    it('DELETE should return 200 when livestream_id is found in db', function () {
        return client
            .delete('/directors/6488818')
            .expect(200);
    });

    it('DELETE should return 404 when livestream_id is not found in db', function () {
        return client
            .delete('/directors/12345')
            .expect(404);
    });
});