'use strict';
const jwt = require('jsonwebtoken');
const UserModel = require('../../database/models').User;
const CulinaryModel = require('../../database/models').Culinary;

const authConfig = require("../../config/auth.json");

const { user: user_error } = require('../../config/errors.json');

module.exports = {
  async index(req, res) {
    const { page = 1, pageSize = 5, ...queriesWhere } = req.query;
    const offset = page * pageSize - pageSize;

    try {
      const users = await UserModel.findAll({
        limit: Number.parseInt(pageSize),
        offset: Number.parseInt(offset),
        attributes: ['name', 'phone', 'email', 'createdAt'],
        include: [
          {
            model: CulinaryModel,
            as: 'culinaries',
            through: { attributes: [] },
          }
        ],
        where: queriesWhere
      });
      return res.status(200).json({ users: users });
    } catch(error) {
      return res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const { name, phone, email, password, administrator = true } = req.body;
    // const { location: image = false } = req.file;
    const errors = [];

    if (!name) {
      errors.push(user_error["name"]);
    }
    if (!phone && !email) {
      errors.push(user_error["phone-email"]);
    }
    if (!password) {
      errors.push(user_error["password"]);
    }

    try {
      if (errors.length) {
        const error = new Error(errors.join('\n'));
        error.status = 400;
        throw error;
      }

      const user = await UserModel.create({
        name, phone, email, password, administrator,
      });
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 860000,
      });
      user.password = undefined;

      return res.status(200).json({ user: user, token });
    } catch(error) {
      return res.status(error.status || 500).json({ error: error.message })
    }
  }
}
