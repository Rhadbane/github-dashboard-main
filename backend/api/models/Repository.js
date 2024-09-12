const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repository', RepositorySchema);