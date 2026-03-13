const GalleryItem = require('../models/GalleryItem');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Add new gallery item
// @route   POST /api/gallery
// @access  Private/Admin (Middleware to be added later)
exports.addGalleryItem = async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { alt, order } = req.body;
    let src = req.body.src;

    // If file is uploaded, use its path
    if (req.file) {
      src = `/uploads/gallery/${req.file.filename}`;
    }

    if (!src && !req.file) {
      return res.status(400).json({ message: 'Image source or file is required' });
    }
    
    const newItem = new GalleryItem({
      src: src || '',
      alt: alt || '',
      order: order || 0
    });

    console.log('Attempting to save newItem:', newItem);
    const item = await newItem.save();
    console.log('Item saved successfully:', item._id);
    res.status(201).json(item);
  } catch (err) {
    console.error('Save error:', err);
    res.status(400).json({ message: 'Error adding item', error: err.message });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res) => {
  try {
    console.log('Update Params:', req.params);
    console.log('Update Body:', req.body);
    console.log('Update File:', req.file);

    const { alt, order } = req.body;
    let src = req.body.src;

    if (req.file) {
      src = `/uploads/gallery/${req.file.filename}`;
    }

    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (src) item.src = src;
    if (alt !== undefined) item.alt = alt;
    if (order !== undefined) item.order = order;

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne();
    res.status(200).json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
