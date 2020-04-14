'use strict';
const express = require('express');

const CulinaryController = require('../../controllers/app/CulinaryController');

const authMiddleware = require('../../middlewares/authMiddlware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', CulinaryController.create);

module.exports = router;
