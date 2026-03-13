const mongoose = require('mongoose');
require('dotenv').config();

const GalleryItemSchema = new mongoose.Schema({
  src: String,
  alt: String,
  order: Number
}, { timestamps: true });

const GalleryItem = mongoose.model('GalleryItem', GalleryItemSchema);

async function purgeDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const result = await GalleryItem.deleteMany({});
    console.log('Deleted', result.deletedCount, 'items');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

purgeDB();
