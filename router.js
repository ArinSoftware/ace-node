const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const pageController = require('./controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/register', pageController.getRegisterPage);

router.post('/register', authController.createUser);

module.exports = router;
