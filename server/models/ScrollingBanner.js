const mongoose = require('mongoose');

const ScrollingBannerSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ScrollingBanner', ScrollingBannerSchema);
