'use strict';
const UserModel = require('../../database/models').User;
const RecipeModel = require('../../database/models').Recipe;
const IngredientModel = require('../../database/models').Ingredient;

const { user: user_error, recipe: recipe_error } = require('../../config/errors.json');

module.exports = {
  async index(req, res) {
    try {
      const recipes = await RecipeModel.findAll();
      return res.status(200).json(recipes);
    } catch(error) {
      return res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const {
      name = '',
      description = '',
      preparationMethod = '',
      totalMinutes = '',
      hot = null,
      calorie = '',
      howManyServe = '',
      ingredients = ''
    } = req.body;
    
    const image = false;

    const id = req.userId;
    const errors = [];

    if (!name) {
      errors.push(recipe_error["name"]);
    }
    if (!description) {
      errors.push(recipe_error["description"]);
    }
    if (!preparationMethod) {
      errors.push(recipe_error["preparationMethod"]);
    }
    if (!totalMinutes) {
      errors.push(recipe_error["totalMinutes"]);
    }
    if (!howManyServe) {
      errors.push(recipe_error["howManyServe"]);
    }
    if (hot === null) {
      errors.push(recipe_error["hot"]);
    }
    if (!ingredients) {
      errors.push(recipe_error["ingredient"]);
    }

    try {
      if (errors.length) {
        const error = new Error(errors.join('\n'));
        error.status = 400;
        throw error;
      }

      const user = await UserModel.findByPk(Number.parseInt(id));

      if (!user.administrator) {
        error.status = 403;
        throw error;
      }
      
      const createRecipe = {
        'falsefalse': async user => (
          await user.createRecipe({
            name,
            description,
            preparationMethod,
            howManyServe,
            totalMinutes,
            hot,
          })
        ),
        'falsetrue': async user => (
          await user.createRecipe({
            name,
            description,
            preparationMethod,
            howManyServe,
            totalMinutes,
            hot,
            image
          })
        ),
        'truefalse': async user => (
          await user.createRecipe({
            name,
            description,
            preparationMethod,
            totalMinutes,
            howManyServe,
            hot,
            calorie
          })
        ),
        'truetrue': async user => (
          await user.createRecipe({
            name,
            description,
            preparationMethod,
            totalMinutes,
            howManyServe,
            hot,
            calorie,
            image
          })
        )
      };
      
      const recipeFunction = createRecipe[String(!!calorie) + String(!!image)];
      const recipe = await recipeFunction(user);

      await ingredients
        .filter(obj => !!obj.name && !!obj.portion && !!obj.quantity)
        .map(async obj => {
          const { name, portion, mass = true, quantity } = obj;
          const [ingredient, created] = await IngredientModel.findOrCreate({ where: { name } });
          await ingredient.createMeasure({ portion, mass, quantity });
          await recipe.addIngredient(ingredient);
        });

      return res.status(200).json(recipe);
    } catch(error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
}
