// api/config/database.js

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/github-dashboard-main';

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Optional: Return the default database
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
