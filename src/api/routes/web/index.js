'use strict';
const express = require('express');
const multer = require('multer');

// Configs
const multerConfig = require('../../config/multer');

// Controllers
const UserController = require('../../controllers/web/UserController');
const RecipeController = require('../../controllers/web/RecipeController');
const CulinaryController = require('../../controllers/web/CulinaryController');

// Custom Middlewares
const accessMiddleware = require('../../middlewares/accessMiddleware');
const faviconMiddlware = require('../../middlewares/faviconMiddleware');
const authMiddleware = require('../../middlewares/authMiddlware');

// Initialize the Router which will be export
const router = express.Router();

// Using Middlewares
router.use(accessMiddleware);
router.use(faviconMiddlware);

// User
router.get('/users', UserController.index);
router.post('/user', UserController.create);
// Recipe
router.post('/recipe', authMiddleware, multer(multerConfig).single('file'), RecipeController.create);
router.get('/recipe', RecipeController.index);
// Culinary
router.post('/culinary', multer(multerConfig).single('file'), CulinaryController.create);
router.get('/culinary', CulinaryController.index);

module.exports = router;
