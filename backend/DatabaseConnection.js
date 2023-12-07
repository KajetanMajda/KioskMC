const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/KioskMC', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

module.exports = connectToDatabase;