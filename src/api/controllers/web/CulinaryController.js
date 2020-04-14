'use strict';
const CulinaryModel = require('../../database/models/').Culinary;

module.exports = {
  
  // GET ALL REGISTERS OF CULINARY IN DATABASE AS SYSTEM ADMINISTRATOR
  async index(req, res) {
    try {
      const culinaries = await CulinaryModel.findAll();
      return res.status(200).json(culinaries);
    } catch(error) {
      return res.status(500).json({ error: error });
    }
  },

  // CREATE A CULINARY AS SYSTEM ADMINISTRATOR
  async create(req, res) {
    const { name, description } = req.body;
    const id = req.userId;

    try {
      if (!name || !description) {
        throw new Error('You need send name and description in the body');
      }
      const culinary = await CulinaryModel.create(req.body);
      return res.json(culinary);
    } catch(error) {
      return res.status(500).json(error);
    }
  }
}
