const express = require('express');
const router = express.Router();
const upload = require('../middleware/bannerUpload');
const { 
  getBanners, 
  addBanner, 
  deleteBanner 
} = require('../controllers/bannerController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getBanners);
router.post('/', protect, upload.single('image'), addBanner);
router.delete('/:id', protect, deleteBanner);

module.exports = router;
