const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

module.exports = connectToDatabase;