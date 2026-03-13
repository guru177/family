const express = require('express');
const router = express.Router();
const upload = require('../middleware/heroUpload');
const { 
  getHeroSlides, 
  addOrUpdateSlide, 
  deleteSlide,
  reorderSlides
} = require('../controllers/heroSliderController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getHeroSlides);
router.post('/', protect, upload.single('image'), addOrUpdateSlide);
router.put('/reorder', protect, reorderSlides);
router.delete('/:id', protect, deleteSlide);

module.exports = router;
