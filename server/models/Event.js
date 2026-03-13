const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  time: String,
  title: String,
  desc: String
});

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: String, // Stored as ISO string or YYYY-MM-DD
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Hidden'],
    default: 'Draft'
  },
  agenda: [AgendaSchema]
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
