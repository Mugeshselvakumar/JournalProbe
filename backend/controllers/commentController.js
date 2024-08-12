// controllers/commentController.js
const Comment = require('../models/comment');

exports.addComment = async (req, res) => {
  try {
    const { journalId, author, comment } = req.body;
    const newComment = new Comment({ journalId, author, comment });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

exports.getCommentsByJournalId = async (req, res) => {
  try {
    const { journalId } = req.params;
    const comments = await Comment.find({ journalId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
