const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

const connectDB = async () => {
    try {
        // Make sure process.env.MONGO_URI is valid
        //console.log('Mongo URI:', process.env.MONGO_URI); // Log to check URI

        const mongoose = require('mongoose');

        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));

        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
