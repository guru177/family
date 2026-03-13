const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  getEventBySlug, 
  saveEvent, 
  deleteEvent,
  updateStatus
} = require('../controllers/eventController');
const upload = require('../middleware/eventUpload');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.get('/slug/:slug', getEventBySlug);
router.post('/', protect, upload.single('image'), saveEvent);
router.delete('/:id', protect, deleteEvent);
router.patch('/:id/status', protect, updateStatus);

module.exports = router;
