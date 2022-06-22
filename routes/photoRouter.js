const express = require('express');
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(authMiddleware, photoController.createPhoto);
router.route('/:id').get(authMiddleware, photoController.getPhoto);
router.route('/:id').delete(authMiddleware, photoController.deletePhoto);

module.exports = router;
