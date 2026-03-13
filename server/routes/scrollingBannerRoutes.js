const express = require('express');
const router = express.Router();
const { 
  getBannerMessages, 
  addBannerMessage, 
  deleteBannerMessage 
} = require('../controllers/scrollingBannerController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getBannerMessages);
router.post('/', protect, addBannerMessage);
router.delete('/:id', protect, deleteBannerMessage);

module.exports = router;
