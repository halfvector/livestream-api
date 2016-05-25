/**
 * Load all DB models.
 */

var Sequelize = require('sequelize');
var config = require('../configuration');

var sequelize = new Sequelize(config.db);
var DataTypes = Sequelize;

var Movie = sequelize.define('Movie', {
    movie_name: DataTypes.STRING
});

var FavoriteMovies = sequelize.define('FavoriteMovies', {
});

var Director = sequelize.define('Director', {
    livestream_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    full_name: DataTypes.STRING,
    favorite_camera: DataTypes.STRING,
    favorite_movies: DataTypes.STRING
});

/*
 * Setup n:m relationship between Movie and Director
 * where a Director may have multiple Favorite Movies
 * and a Movie may be favorited by multiple Directors
 */
Movie.belongsToMany(Director, {through: FavoriteMovies});
Director.belongsToMany(Movie, {through: FavoriteMovies});

module.exports = {
    // Models
    Director: Director,
    Movie: Movie,
    FavoriteMovies: FavoriteMovies,

    // DB Connection
    sequelize: sequelize
}