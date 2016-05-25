var router = require('express').Router;
var db = require('../models');

module.exports = function (app) {
    app.use('/', function (req, res, next) {
        db.Director.findAll().then(function (articles) {
            res.json(articles);
        });
    });
};
