const mongoose = require('mongoose');

const causeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Cause', causeSchema);
