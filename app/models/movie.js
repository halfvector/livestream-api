/**
 * Movie model
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Movie', {
        movie_name: DataTypes.STRING
    });
};

