const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const { name, role, content, image, rating } = req.body;

        const testimonial = new Testimonial({
            name,
            role,
            content,
            image,
            rating
        });

        const createdTestimonial = await testimonial.save();
        res.status(201).json(createdTestimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (testimonial) {
            testimonial.name = req.body.name || testimonial.name;
            testimonial.role = req.body.role || testimonial.role;
            testimonial.content = req.body.content || testimonial.content;
            testimonial.image = req.body.image || testimonial.image;
            testimonial.rating = req.body.rating || testimonial.rating;

            const updatedTestimonial = await testimonial.save();
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            await testimonial.deleteOne();
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
