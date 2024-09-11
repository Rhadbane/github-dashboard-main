const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const repositoryRoutes = require('./routes/repositoryRoutes');
const { MONGODB_URI } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/repositories', repositoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;