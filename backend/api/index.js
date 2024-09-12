// api/index.js

const express = require('express');
const cors = require('cors');
const repositoryRoutes = require('./routes/repositoryRoutes');
const { connectToDatabase } = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const initializeDB = async () => {
  try {
    const db = await connectToDatabase();
    console.log('Database initialized');
    // You can pass `db` to other modules if needed
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Call initializeDB
initializeDB();

app.use('/api/repositories', repositoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel, we export the app
module.exports = app;
