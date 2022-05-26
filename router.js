const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const pageController = require('./controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/register', pageController.getRegisterPage);
router.get('/login', pageController.getLoginPage);

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;
