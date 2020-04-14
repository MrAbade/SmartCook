'use strict';
const UserModel = require('../../database/models').User;
const IngredientModel = require('../../database/models').Ingredient;

module.exports = {
  
  // RETURN INGREDIENTS
  async index(req, res) {
  },

  // ADD AN INGREDIENT
  async create(req, res) {
    const id = req.userId;
    const { ingredientsObject } = req.body;

    try {
      if (!names || !names.length) {
        let error = new Error('You need tell us what ingredients do you have');
        error.status = 400;
        throw error;
      }

      const user = await UserModel.findByPk(Number.parseInt(id));
      const ingredients = await ingredientsObject
        .map(async ingredientObject => await IngredientModel.create({
          name: ingredientObject.name,
          portion: ingredientObject.portion,
          mass: ingredientObject.mass,
          quantity: ingredientObject.quantity,
      }));
      const out = await user.addIngredients(ingredients);
      return res.status(200).json({ out });
    } catch(error) {
      return res.status(error.status || 500).json({ error: error });
    }
  },

  // DELETE AN INGREDIENT
  async delete(req, res) {

  },
};
