const Event = require('../models/Event');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get single event by slug
// @route   GET /api/events/slug/:slug
// @access  Public
exports.getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Create or Update event
// @route   POST /api/events
// @access  Private/Admin
exports.saveEvent = async (req, res) => {
  try {
    const { id, title, date, time, location, category, description, agenda, status } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/events/${req.file.filename}`;
    }

    let event;
    if (id && id !== 'undefined') {
      event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: 'Event not found' });

      if (title && title !== event.title) {
        event.title = title;
        event.slug = slugify(title);
      }
      
      event.date = date || event.date;
      event.time = time || event.time;
      event.location = location || event.location;
      event.category = category || event.category;
      event.description = description || event.description;
      event.agenda = agenda ? JSON.parse(agenda) : event.agenda;
      event.image = image || event.image;
      event.status = status || event.status;

      await event.save();
    } else {
      event = new Event({
        title,
        slug: slugify(title),
        date,
        time,
        location,
        category,
        description,
        agenda: agenda ? JSON.parse(agenda) : [],
        image,
        status: status || 'Draft'
      });
      await event.save();
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Error saving event', error: err.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.deleteOne();
    res.status(200).json({ message: 'Event removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Update event status
// @route   PATCH /api/events/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
