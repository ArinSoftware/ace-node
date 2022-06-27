const express = require('express');
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(authMiddleware, photoController.createPhoto);
router.route('/:id').get(photoController.getPhoto);
router.route('/:id').delete(authMiddleware, photoController.deletePhoto);
router.route('/edit/:id').get(authMiddleware, photoController.updatePhoto);
router.route('/:id').put(authMiddleware, photoController.putPhoto);

module.exports = router;
