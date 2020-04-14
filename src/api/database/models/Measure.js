'use strict';
module.exports = (sequelize, DataTypes) => {
  const Measure = sequelize.define('Measure', {
    name: DataTypes.STRING,
    quantity: DataTypes.DOUBLE,
    mass: DataTypes.BOOLEAN,
    portion: DataTypes.INTEGER
  }, {});
  Measure.associate = function(models) {
    Measure.hasMany(models.Ingredient);
  };
  return Measure;
};