'use strict';
module.exports = (sequelize, DataTypes) => {
  const Culinary = sequelize.define('Culinary', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: { 
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Culinary.associate = function(models) {
    Culinary.belongsToMany(models.User, { foreignKey: 'culinaryId', through: 'UserCulinaries', as: 'users' });
    Culinary.belongsToMany(models.Recipe, { foreignKey: 'culinaryId', through: 'CulinaryRecipes', as: 'recipes' });
  };
  return Culinary;
};
