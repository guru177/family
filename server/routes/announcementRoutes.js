const express = require('express');
const router = express.Router();
const { 
  getAnnouncements, 
  getAnnouncementById, 
  getAnnouncementBySlug,
  saveAnnouncement, 
  deleteAnnouncement,
  updateStatus
} = require('../controllers/announcementController');
const upload = require('../middleware/announcementUpload');

router.get('/', getAnnouncements);
router.get('/slug/:slug', getAnnouncementBySlug);
router.get('/:id', getAnnouncementById);
router.post('/', upload.single('image'), saveAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.patch('/:id/status', updateStatus);

module.exports = router;
