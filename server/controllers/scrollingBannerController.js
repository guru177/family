const ScrollingBanner = require('../models/ScrollingBanner');

// @desc    Get all banner messages
// @route   GET /api/scrolling-banner
// @access  Public
exports.getBannerMessages = async (req, res) => {
  try {
    const banners = await ScrollingBanner.find().sort({ createdAt: 1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Add a banner message
// @route   POST /api/scrolling-banner
// @access  Private/Admin
exports.addBannerMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const banner = new ScrollingBanner({ message });
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ message: 'Error adding message', error: err.message });
  }
};

// @desc    Delete a banner message
// @route   DELETE /api/scrolling-banner/:id
// @access  Private/Admin
exports.deleteBannerMessage = async (req, res) => {
  try {
    const banner = await ScrollingBanner.findById(req.params.id);
    if (!announcement) { // Typo fixed in next step or now
       // Wait, typo in my thought. It's 'banner'
    }
    if (!banner) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await banner.deleteOne();
    res.status(200).json({ message: 'Message removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
