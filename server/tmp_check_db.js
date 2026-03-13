const mongoose = require('mongoose');
require('dotenv').config();

const GalleryItemSchema = new mongoose.Schema({
  src: String,
  alt: String,
  order: Number
}, { timestamps: true });

const GalleryItem = mongoose.model('GalleryItem', GalleryItemSchema);

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const items = await GalleryItem.find({});
    console.log('Found', items.length, 'items');
    items.forEach(item => {
      console.log(JSON.stringify(item, null, 2));
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDB();
