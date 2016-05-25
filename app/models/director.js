/**
 * Director model
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Director', {
        full_name: DataTypes.STRING,
        favorite_camera: DataTypes.STRING,
        favorite_movies: DataTypes.STRING
    });
};

