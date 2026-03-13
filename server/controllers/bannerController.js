const Banner = require('../models/Banner');

// @desc    Get all banners
// @route   GET /api/banners
// @access  Public
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Add new banner
// @route   POST /api/banners
// @access  Private/Admin
exports.addBanner = async (req, res) => {
  try {
    const { alt, order } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/banners/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Banner image file is required' });
    }

    const newBanner = new Banner({
      src,
      alt: alt || '',
      order: order || 0
    });

    const banner = await newBanner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ message: 'Error adding banner', error: err.message });
  }
};

// @desc    Delete banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    await banner.deleteOne();
    res.status(200).json({ message: 'Banner removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
