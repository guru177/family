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

const { protect } = require('../middleware/authMiddleware');

router.get('/', getAnnouncements);
router.get('/slug/:slug', getAnnouncementBySlug);
router.get('/:id', getAnnouncementById);
router.post('/', protect, upload.single('image'), saveAnnouncement);
router.delete('/:id', protect, deleteAnnouncement);
router.patch('/:id/status', protect, updateStatus);

module.exports = router;
