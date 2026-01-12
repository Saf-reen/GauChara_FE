const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Get blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const { title, slug, content, excerpt, featuredImage, images, quote } = req.body;

        const blogExists = await Blog.findOne({ slug });
        if (blogExists) {
            return res.status(400).json({ error: 'Blog with this slug already exists' });
        }

        const blog = new Blog({
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            images,
            quote,
            author: req.admin.username
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.slug = req.body.slug || blog.slug;
            blog.content = req.body.content || blog.content;
            blog.excerpt = req.body.excerpt || blog.excerpt;
            blog.featuredImage = req.body.featuredImage || blog.featuredImage;
            blog.images = req.body.images || blog.images;
            blog.quote = req.body.quote || blog.quote;

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
