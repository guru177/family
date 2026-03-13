const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);
