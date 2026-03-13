const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { 
  getGalleryItems, 
  addGalleryItem, 
  updateGalleryItem,
  deleteGalleryItem 
} = require('../controllers/galleryController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getGalleryItems);
router.post('/', protect, upload.single('image'), addGalleryItem);
router.put('/:id', protect, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
