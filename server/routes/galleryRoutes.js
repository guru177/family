const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { 
  getGalleryItems, 
  addGalleryItem, 
  updateGalleryItem,
  deleteGalleryItem 
} = require('../controllers/galleryController');

router.get('/', getGalleryItems);
router.post('/', upload.single('image'), addGalleryItem);
router.put('/:id', upload.single('image'), updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

module.exports = router;
