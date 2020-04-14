'use strict';
const express = require('express');

const app = require('./app');
const web = require('./web');

const router = express.Router();

// mobile application *** app users
router.use('/app', app);
// web application *** system administrators
router.use('/web', web);

module.exports = router;
