const express = require('express');
const router = express.Router();
const Cause = require('../models/Cause');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all causes
// @route   GET /api/causes
// @access  Public
router.get('/', async (req, res) => {
    try {
        const causes = await Cause.find({}).sort({ createdAt: -1 });
        res.json(causes);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Get cause by id
// @route   GET /api/causes/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const cause = await Cause.findById(req.params.id);
        if (cause) {
            res.json(cause);
        } else {
            res.status(404).json({ error: 'Cause not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Create a cause
// @route   POST /api/causes
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, content, image, goalAmount, category, featured } = req.body;

        const cause = new Cause({
            title,
            description,
            content,
            image,
            goalAmount,
            category,
            featured
        });

        const createdCause = await cause.save();
        res.status(201).json(createdCause);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Update a cause
// @route   PUT /api/causes/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const cause = await Cause.findById(req.params.id);

        if (cause) {
            cause.title = req.body.title || cause.title;
            cause.description = req.body.description || cause.description;
            cause.content = req.body.content || cause.content;
            cause.image = req.body.image || cause.image;
            cause.goalAmount = req.body.goalAmount || cause.goalAmount;
            cause.category = req.body.category || cause.category;
            cause.featured = req.body.featured !== undefined ? req.body.featured : cause.featured;

            const updatedCause = await cause.save();
            res.json(updatedCause);
        } else {
            res.status(404).json({ error: 'Cause not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Delete a cause
// @route   DELETE /api/causes/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const cause = await Cause.findById(req.params.id);
        if (cause) {
            await cause.deleteOne();
            res.json({ message: 'Cause removed' });
        } else {
            res.status(404).json({ error: 'Cause not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
