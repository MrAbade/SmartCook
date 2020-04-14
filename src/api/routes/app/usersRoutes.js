'use strict';
const express = require('express');

const UserController = require('../../controllers/app/UserController');

const router = express.Router();

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);

module.exports = router;
