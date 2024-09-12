const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const repositoryRoutes = require('./routes/repositoryRoutes');
const { MONGODB_URI } = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // In a serverless environment, it's better to throw the error
    // so that the function can restart and try to reconnect
    throw err;
  }
};

// Call connectDB, but don't wait for it (faster cold starts)
connectDB();

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