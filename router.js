const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const pageController = require('./controllers/pageController');
const photoController = require('./controllers/photoController');
const authMiddleware = require('./middlewares/authMiddleware');
const redirectMiddleware = require('./middlewares/redirectMiddleware');

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/register', redirectMiddleware, pageController.getRegisterPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.get('/logout', redirectMiddleware, authController.logoutUser);
router.get('/dashboard', authMiddleware, authController.getDashboardPage);

router.get('/upload-photo', authMiddleware, photoController.getUploadPhotoPage);

module.exports = router;
