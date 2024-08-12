// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  journalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal', required: true },
  author: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
