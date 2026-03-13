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

router.get('/', getEvents);
router.get('/slug/:slug', getEventBySlug);
router.post('/', upload.single('image'), saveEvent);
router.delete('/:id', deleteEvent);
router.patch('/:id/status', updateStatus);

module.exports = router;
