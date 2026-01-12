const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/authMiddleware');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'gauchara_secret_key_2024', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    res.json(req.admin);
});

// Temporary route to create initial admin (Should be removed or secured in production)
router.post('/register-initial', async (req, res) => {
    const { username, password, secret } = req.body;

    // Simple secret check to prevent unauthorized registration
    if (secret !== 'gauchara_init_2024') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
        return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = await Admin.create({
        username,
        password
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400).json({ error: 'Invalid admin data' });
    }
});

module.exports = router;
