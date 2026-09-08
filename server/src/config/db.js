const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/qsr_academy';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 3000,
    });

    isConnected = true;
    console.log(`[MongoDB] ✅ Connected to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`\n⚠️  [MongoDB Warning] Could not connect to MongoDB at: ${connUri}`);
    console.warn(`   Reason: ${error.message}`);
    console.warn(`   🚀 [Zero-Config Fallback] QSR Academy server is running with resilient in-memory development storage.`);
    console.warn(`   All forms, admin authentication, leads tables, and courses are fully operational!`);
    console.warn(`   To connect to MongoDB Atlas in production, set MONGODB_URI in server/.env\n`);
    return null;
  }
};

const isDbConnected = () => isConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
