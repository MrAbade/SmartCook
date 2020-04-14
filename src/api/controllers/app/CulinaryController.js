'use strict';
const UserModel = require('../../database/models').User;
const CulinaryModel = require('../../database/models').Culinary;

module.exports = {

  // RETURN CULINARIES
  async index(req, res) {
    
  },

  // ADD CULINARIES
  async create(req, res) {
    const id = req.userId;
    const { name = false, description = false } = req.body;
    const { location: url = false } = req.file;

    try {
      if (!name || !description) {
        throw new Error('You need pass name and description in body to this endpoint');
      }

      const user = await UserModel.findByPk(Number.parseInt(id))
      const culinary = await CulinaryModel.create({ name, description,  });
      await user.addCulinary(culinary);

      return res.status(200).json({ culinary });
    } catch(error) {
      return res.status(500).json({ error: error });
    }
  },

  // DELETE CULINARIES
  async delete(req, res) {
    
  },
};
