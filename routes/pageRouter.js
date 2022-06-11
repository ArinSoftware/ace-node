const express = require('express');
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/register', redirectMiddleware, pageController.getRegisterPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.get('/dashboard', authMiddleware, authController.getDashboardPage);

router.get('/upload-photo', authMiddleware, photoController.getUploadPhotoPage);

module.exports = router;
