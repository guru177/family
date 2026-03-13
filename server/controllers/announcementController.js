const Announcement = require('../models/Announcement');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Public
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get single announcement by slug
// @route   GET /api/announcements/slug/:slug
// @access  Public
exports.getAnnouncementBySlug = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ slug: req.params.slug });
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Create or Update announcement
// @route   POST /api/announcements
// @access  Private/Admin
exports.saveAnnouncement = async (req, res) => {
  try {
    const { id, title, date, category, author, readTime, excerpt, content, status } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/announcements/${req.file.filename}`;
    }

    let announcement;
    if (id && id !== 'undefined') {
      announcement = await Announcement.findById(id);
      if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

      if (title && title !== announcement.title) {
        announcement.title = title;
        announcement.slug = slugify(title);
      }
      
      announcement.date = date || announcement.date;
      announcement.category = category || announcement.category;
      announcement.author = author || announcement.author;
      announcement.readTime = readTime || announcement.readTime;
      announcement.excerpt = excerpt || announcement.excerpt;
      announcement.content = content ? JSON.parse(content) : announcement.content;
      announcement.image = image || announcement.image;
      announcement.status = status || announcement.status;

      await announcement.save();
    } else {
      announcement = new Announcement({
        title,
        slug: slugify(title),
        date: date || new Date().toISOString().split('T')[0],
        category,
        author: author || 'Family Admin',
        readTime: readTime || '5 min read',
        excerpt,
        content: content ? JSON.parse(content) : [],
        image,
        status: status || 'Draft'
      });
      await announcement.save();
    }

    res.status(200).json(announcement);
  } catch (err) {
    res.status(400).json({ message: 'Error saving announcement', error: err.message });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    await announcement.deleteOne();
    res.status(200).json({ message: 'Announcement removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Update announcement status
// @route   PATCH /api/announcements/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
