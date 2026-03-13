const HeroSlider = require('../models/HeroSlider');

// @desc    Get all hero slides
// @route   GET /api/hero-slider
// @access  Public
exports.getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlider.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Add or Update hero slide
// @route   POST /api/hero-slider
// @access  Private/Admin
exports.addOrUpdateSlide = async (req, res) => {
  try {
    const { id, title, subtitle, description, order } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/hero/${req.file.filename}`;
    }

    if (!image && !req.file && !id) {
       return res.status(400).json({ message: 'Image is required for new slides' });
    }

    let slide;
    if (id && id !== 'undefined') {
      // Update existing
      slide = await HeroSlider.findById(id);
      if (!slide) return res.status(404).json({ message: 'Slide not found' });
      
      if (title) slide.title = title;
      if (subtitle !== undefined) slide.subtitle = subtitle;
      if (description !== undefined) slide.description = description;
      if (image) slide.image = image;
      if (order !== undefined) slide.order = order;
      
      await slide.save();
    } else {
      // Create new
      slide = new HeroSlider({
        title,
        subtitle: subtitle || '',
        description: description || '',
        image,
        order: order || 0
      });
      await slide.save();
    }

    res.status(200).json(slide);
  } catch (err) {
    res.status(400).json({ message: 'Error saving slide', error: err.message });
  }
};

// @desc    Delete hero slide
// @route   DELETE /api/hero-slider/:id
// @access  Private/Admin
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await HeroSlider.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    await slide.deleteOne();
    res.status(200).json({ message: 'Slide removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
// @desc    Reorder hero slides
// @route   PUT /api/hero-slider/reorder
// @access  Private/Admin
exports.reorderSlides = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }

    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid orders data' });
    }

    const updatePromises = orders.map(item => 
      HeroSlider.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
