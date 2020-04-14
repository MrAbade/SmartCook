'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    preparationMethod: DataTypes.TEXT,
    totalMinutes: DataTypes.STRING,
    hot: DataTypes.BOOLEAN,
    calorie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    howManyServe: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Ingredient, { foreignKey: 'recipeId', through: 'IngredientRecipes', as: 'ingredients' });
    Recipe.belongsToMany(models.Culinary, { foreignKey: 'recipeId', through: 'CulinaryRecipes', as: 'culinaries' });
    Recipe.belongsToMany(models.User, { foreignKey: 'recipeId', through: 'Likes', as: 'likes' });
    Recipe.belongsTo(models.User);
  };
  return Recipe;
};
