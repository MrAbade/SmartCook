"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../database/models").User;

const authConfig = require("../../config/auth.json");

module.exports = {

  // SIGN IN
  async signin(req, res) {
    let { phone, email, password } = req.body;

    if (!!phone) {
      try {
        const user = await UserModel.findOne({
          where: { phone: phone},
          attributes: ['id', 'name', 'phone', 'email', 'password']
        });
        if (!await bcrypt.compare(password, user.password)) {
          throw new Error('Invalid Password');
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 860000,
        });
        user.password = undefined;
        user.id = undefined;
        return res.status(200).json({ user: user, token }); 
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    } else {
      try {
        const user = await UserModel.findOne({
          where: { email: email },
          attributes: ['id', 'name', 'phone', 'email', 'password']
        });
        if (!await bcrypt.compare(password, user.password)) {
          throw new Error('Invalid Password');
        }
        user.password = undefined;
        user.id = undefined;
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 860000,
        });
        return res.status(200).json({ user: user, token });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    }
  },

  // SIGN UP
  async signup(req, res) {
    const { name, phone, email, password } = req.body;

    try {
      const user = await UserModel.create({
        name, phone, email, password
      });
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 860000,
      });
      user.password = undefined;
      return res.status(200).json({ user: user, token });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },
};
