const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/db');

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const username = process.argv[2];
        const password = process.argv[3];

        if (!username || !password) {
            console.log('Usage: node scripts/createAdmin.js <username> <password>');
            process.exit(1);
        }

        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(1);
        }

        const admin = await Admin.create({
            username,
            password,
        });

        console.log(`Admin user ${admin.username} created successfully`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
