const express = require('express');
const router = express.Router();
const upload = require('../middleware/bannerUpload');
const { 
  getBanners, 
  addBanner, 
  deleteBanner 
} = require('../controllers/bannerController');

router.get('/', getBanners);
router.post('/', upload.single('image'), addBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
