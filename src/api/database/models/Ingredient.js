'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.User, { foreignKey: 'ingredientId', through: 'UserIngredients', as: 'users' });
    Ingredient.belongsToMany(models.Recipe, { foreignKey: 'ingredientId', through: 'IngredientRecipes', as: 'recipes' });
    Ingredient.belongsTo(models.Measure);
  };
  return Ingredient;
};