const express = require('express');
const router = express.Router();
const upload = require('../middleware/heroUpload');
const { 
  getHeroSlides, 
  addOrUpdateSlide, 
  deleteSlide 
} = require('../controllers/heroSliderController');

router.get('/', getHeroSlides);
router.post('/', upload.single('image'), addOrUpdateSlide);
router.delete('/:id', deleteSlide);

module.exports = router;
