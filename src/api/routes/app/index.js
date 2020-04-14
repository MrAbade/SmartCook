'use strict';
const express = require('express');

const users = require('./usersRoutes');
const culinaries = require('./culinariesRoutes');
const recipes = require('./recipesRoutes');

const router = express.Router();

router.use('/users', users);
router.use('/culinaries', culinaries);
router.use('/recipes', recipes);

module.exports = router;