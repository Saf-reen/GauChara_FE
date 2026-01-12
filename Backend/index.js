const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./src/config/db');
const contactRoutes = require('./src/routes/contact');
const donationRoutes = require('./src/routes/donation');
const chatRoutes = require('./src/routes/chat');
const adminRoutes = require('./src/routes/admin');
const blogRoutes = require('./src/routes/blog');
const causeRoutes = require('./src/routes/cause');
const testimonialRoutes = require('./src/routes/testimonial');

// Connect to Database
connectDB();

const app = express();
app.disable('etag')

const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  // origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  origin: process.env.FRONTEND_URL || 'https://gauchara-frontend.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10kb' })); // Limit body size for security
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'GauChara API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/causes', causeRoutes);
app.use('/api/testimonials', testimonialRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  // Don't leak error details in production
  const isDev = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🐄 GauChara Backend running on port ${PORT}`);
  // console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Health check: /api/health`);

});

module.exports = app;
