const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String, // Stored as ISO string or YYYY-MM-DD
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Family Admin'
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  excerpt: {
    type: String,
    required: true
  },
  content: [
    {
      type: {
        type: String,
        enum: ['paragraph', 'heading', 'blockquote', 'list'],
        required: true
      },
      value: mongoose.Schema.Types.Mixed, // Can be string or array of strings (for list)
      footer: String // For blockquote
    }
  ],
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Hidden'],
    default: 'Draft'
  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
