'use strict';

var router = require('express').Router();
var db = require('../models');
var livestreamClient = require('../livestream_client');

/**
 * Contract:
 * GET /directors - list all director (200)
 * POST /directors - create new director (200, 400, 409)
 * PUT /directors/:director_id - update one director (200, 400, 404)
 * GET /directors/:director_id - get one director (200, 400, 404)
 * DELETE /directors/:director_id - delete one director (200, 400, 404)
 */

router.route('/')
    // List all Directors
    .get(function (req, res) {
        db.Director.findAll().then(function (directors) {
            res.json(directors);
        });
    })

    // Create new Director
    .post(function (req, res) {
        // Validate parameters
        req.checkBody('livestream_id', 'livestream_id field is required and must be an int').isInt();

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
            return;
        }

        // Pull data from API
        return livestreamClient.getAccountDetails(req.body.livestream_id)
            .then(function (data) {
                var model = {
                    livestream_id: req.body.livestream_id,
                    full_name: data.full_name,
                    favorite_camera: req.body.favorite_camera,
                    favorite_movies: req.body.favorite_movies
                };

                // Persist Director in DB
                return db.Director.create(model, {include: [{model: db.Movie, as: "favorite_movies"}]})
                    .then(function (result) {
                        res.status(200).json(result.dataValues);
                    })
                    .catch(function (err) {
                        if (err.name === 'SequelizeUniqueConstraintError') {
                            // Director already exists
                            res.status(409).json({'error': 'Account already exists'});
                        } else {
                            // Unexpected error
                            res.status(500).json(err);
                        }
                    });
            })
            .catch(function (err) {
                // Use remote api service error status and message if available
                if (err.statusCode && err.error) {
                    res.status(err.statusCode).json({error: err.error.message});
                } else {
                    res.status(500).json(err);
                }
            });
    });

router.route('/:livestream_id')
    // Fetch director
    .get(function (req, res) {
        req.checkParams('livestream_id', 'livestream_id field is required and must be an int').isInt();

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
            return;
        }

        return db.Director.findById(req.params.livestream_id, {include: [{model: db.Movie, as: "favorite_movies"}]})
            .then(function (director) {
                if (director) {
                    res.status(200).json(director);
                } else {
                    res.status(404).json({error: "Director not found"});
                }
            });
    })

    // Update director
    .put(function (req, res) {
        req.checkParams('livestream_id', 'livestream_id field is required and must be an int').isInt();

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
            return;
        }
        return db.Director.update({
                favorite_camera: req.body.favorite_camera
            }, {
                where: {livestream_id: req.params.livestream_id},
            })
            .spread(function (result) {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({error: "Director not found"});
                }
            })
            .catch(function (err) {
                res.status(500).json({});
            });
    })

    // Delete director
    .delete(function (req, res) {
        req.checkParams('livestream_id', 'livestream_id field is required and must be an int').isInt();

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
            return;
        }

        return db.Director.destroy({where: {livestream_id: req.params.livestream_id}})
            .then(function (deleted) {
                if (deleted) {
                    // Director deleted
                    res.status(200).json({});
                } else {
                    // Director not deleted (not found)
                    res.status(404).json({error: "Director not found"});
                }
            });
    })
;

module.exports = router;
