const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    images: [String],
    quote: {
        text: String,
        author: String
    },
    author: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
