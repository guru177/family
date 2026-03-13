const express = require('express');
const router = express.Router();
const { 
  getBannerMessages, 
  addBannerMessage, 
  deleteBannerMessage 
} = require('../controllers/scrollingBannerController');

router.get('/', getBannerMessages);
router.post('/', addBannerMessage);
router.delete('/:id', deleteBannerMessage);

module.exports = router;
