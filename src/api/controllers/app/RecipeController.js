'use strict';
const UserModel = require('../../database/models').User;
const RecipeModel = require('../../database/models').Recipe;
const IngredientModel = require('../../database/models').Ingredient;

module.exports = {

  // RETURN THE SPECIFIC RECIPES OF AN CULINARY WHICH USER HAVE ALL INGREDIENTS OF THAT
  async index(req, res) {

  },

  // CREATE AN RECIPE
  async create(req, res) {
    const {
      name = false,
      description = false,
      preparationMethod = false,
      totalMinutes = false,
      hot,
      calorie,
      ingredientObjects
    } = req.body;

    const { location: image = false } = req.file;
    const id = req.userId;
    const errors = [];

    if (!ingredientObjects || !ingredientObjects.length) {
      errors.push('Please, add some ingredients to your new recipe');
    }
    if (!name) {
      errors.push('Please, add a name to your new recipe');
    }
    if (!description) {
      errors.push('Please, add a description to your new recipe');
    }
    if (!preparationMethod) {
      errors.push('Please, add a preparation method to your new recipe');
    }
    if (!totalMinutes) {
      errors.push('Please, tell us how long approximately the recipe takes to get ready');
    }
    if (!hot.length) {
      errors.push('Please, tell us whether your new recipe should be consumed hot or cold');
    }

    try {
      if (errors.length) {
        let error = new Error(errors.join('\n'));
        error.status = 400;
        throw error;
      }

      const user = UserModel.findByPk(Number.parseInt(id));
      const ingredients = await ingredientObjects.map(async ingredientObject => {
        const { name, portion = 1, mass, quantity } = ingredientObject;
        return await IngredientModel.findOrCreate({ where: { name } })[0];
      });

      if (!await RecipeModel.count({ where: { name: name } }) ) {
        let error = new Error('This recipe already exists, but you can customize it');
        error.status = 400;
        throw error;
      }
      
      recipe = await RecipeModel.addIngredients(ingredients);
      user.addRecipe(recipe);
      return res.status(200).json({ user });
    } catch(error) {
      return res.status(error.status || 500).json({ error: error });
    }
  }
}
