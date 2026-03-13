const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Family Community Portal API is running!');
});

// Routes
app.use('/api/hero-slider', require('./routes/heroSliderRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/scrolling-banner', require('./routes/scrollingBannerRoutes'));

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});