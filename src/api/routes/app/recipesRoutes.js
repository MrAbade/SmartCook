'use strict';
const express = require('express');

const RecipeController = require('../../controllers/app/RecipeController');

const authMiddlware = require('../../middlewares/authMiddlware');

const router = express();

router.use(authMiddlware);

router.get('/', RecipeController.create);

module.exports = router;
