const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  image: { type: String, required: false },
});

module.exports = mongoose.model('Journal', journalSchema);
