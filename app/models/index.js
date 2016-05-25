/**
 * Load all DB models.
 */

var Sequelize = require('sequelize');
var config = require('../configuration');

var sequelize = new Sequelize(config.db);
var DataTypes = Sequelize;

var Movie = sequelize.define('Movie', {
    movie_name: {
        type: DataTypes.STRING,
        unique: true
    }
});

var Director = sequelize.define('Director', {
    livestream_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    full_name: DataTypes.STRING,
    favorite_camera: DataTypes.STRING
});

/*
 * Setup n:m relationship between Movie and Director
 * where a Director may have multiple Favorite Movies
 * and a Movie may be favorited by multiple Directors
 */
Movie.belongsToMany(Director, {through: 'FavoriteMovies', as: 'favorite_movies'});
Director.belongsToMany(Movie, {through: 'FavoriteMovies', as: 'favorite_movies'});

module.exports = {
    // Models
    Director: Director,
    Movie: Movie,

    // DB Connection
    sequelize: sequelize
}