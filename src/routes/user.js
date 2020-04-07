const express = require('express');
// Import Controllers
const controllers = require('../controllers/user');

// Setup Router
const router = new express.Router();

// Create Users
router.post('/api/v1/users/signup', controllers.createUser);

// Login Users
router.post('/api/v1/users/login', controllers.loginUser);

module.exports = router;
