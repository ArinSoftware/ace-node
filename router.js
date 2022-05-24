const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const pageController = require('./controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
