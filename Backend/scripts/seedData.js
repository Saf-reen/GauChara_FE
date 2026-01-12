const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../src/models/Blog');
const Cause = require('../src/models/Cause');
const Testimonial = require('../src/models/Testimonial');
const connectDB = require('../src/config/db');

dotenv.config();

const blogs = [
    {
        title: "Welcome to GauChara Blog",
        slug: "welcome-to-gauchara-blog",
        excerpt: "Welcome to our blog! This is your first post. We'll be sharing updates about our cow welfare initiatives, success stories, and ways you can help support Gaumata.",
        content: "Welcome to our blog! This is your first post. We'll be sharing updates about our cow welfare initiatives, success stories, and ways you can help support Gaumata. Stay tuned for more updates!",
        featuredImage: "/hero-1.webp",
        author: "GauChara Team",
        images: [],
        quote: { text: "", author: "" }
    },
    {
        title: "The Importance of Quality Silage for Cow Welfare",
        slug: "importance-of-quality-silage",
        excerpt: "Learn about how high-quality silage contributes to the health and well-being of Bos Indicus cows, and why nutrition is at the heart of our mission.",
        content: "High-quality silage is essential for the health and well-being of Bos Indicus cows. It provides the necessary nutrients and energy for them to thrive. At GauChara, we prioritize nutrition as a core part of our mission.",
        featuredImage: "/hero-2.jpg",
        author: "Dr. Priya Sharma",
        images: [],
        quote: { text: "", author: "" }
    },
    {
        title: "A Day in the Life at Our Gaushala",
        slug: "day-in-life-gaushala",
        excerpt: "Follow along as we take you through a typical day at one of our partner gaushalas, from morning feeding to evening care routines.",
        content: "A typical day at our gaushala begins with morning prayers and feeding. Our dedicated volunteers ensure that every cow receives the care and attention they deserve. From grooming to medical check-ups, we do it all.",
        featuredImage: "/hero-4.jpg",
        author: "Volunteer Team",
        images: [],
        quote: { text: "", author: "" }
    },
    {
        title: "How Your Donations Make a Difference",
        slug: "how-donations-make-difference",
        excerpt: "See the direct impact of your generous contributions through our quarterly impact report highlighting the lives touched by your support.",
        content: "Your donations directly support our efforts to provide food, shelter, and medical care to cows in need. In our latest quarterly report, we highlight the lives touched by your generosity. Thank you for making a difference!",
        featuredImage: "/hero-5.png",
        author: "GauChara Team",
        images: [],
        quote: { text: "", author: "" }
    },
];

const causes = [
    {
        title: 'Medical Care for Injured Cows',
        description: 'Providing emergency medical treatment and long-term rehabilitation for cows injured in accidents.',
        content: 'Our medical care program is dedicated to providing immediate and long-term treatment for injured cows. We work with veterinary experts to ensure the best possible care for every animal.',
        image: '/hero-3.png',
        goalAmount: 50000,
        raisedAmount: 32500,
        category: 'Medical',
        featured: true,
    },
    {
        title: 'Fodder & Nutrition Program',
        description: 'Ensuring a steady supply of high-quality, organic green fodder and nutritional supplements.',
        content: 'Nutrition is key to cow health. Our fodder program ensures a consistent supply of high-quality, organic green fodder and essential supplements to keep our cows healthy and strong.',
        image: '/hero-8.jpg',
        goalAmount: 30000,
        raisedAmount: 21000,
        category: 'Nutrition',
        featured: false,
    },
    {
        title: 'Gaushala Expansion Project',
        description: 'Building new shelters and improving existing facilities to accommodate more rescued cows.',
        content: 'As we rescue more cows, we need more space. Our expansion project aims to build new shelters and upgrade existing facilities to provide a safe and comfortable home for all our cows.',
        image: '/hero-6.webp',
        goalAmount: 75000,
        raisedAmount: 45000,
        category: 'Infrastructure',
        featured: false,
    },
];

const testimonials = [
    {
        name: 'Maria Gonzalez',
        role: 'Community Leader',
        content: 'Gauchara\'s education program changed my daughter\'s life. She went from having no access to school to being top of her class. We are forever grateful for their support.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
    {
        name: 'James Kimura',
        role: 'Volunteer',
        content: 'Being a volunteer with Gauchara has been the most rewarding experience of my life. Seeing the direct impact of our work on families is truly inspiring.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
    {
        name: 'Priya Sharma',
        role: 'Donor',
        content: 'I\'ve donated to many organizations, but Gauchara stands out for their transparency and genuine impact. Every rupee is used effectively to help those in need.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Blog.deleteMany({});
        await Cause.deleteMany({});
        await Testimonial.deleteMany({});

        console.log('Cleared existing data...');

        // Insert new data
        await Blog.insertMany(blogs);
        await Cause.insertMany(causes);
        await Testimonial.insertMany(testimonials);

        console.log('✅ Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
