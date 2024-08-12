// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to add a new comment
router.post('/addComment', commentController.addComment);

// Route to get comments for a specific journal
router.get('/:journalId/comments', commentController.getCommentsByJournalId);

module.exports = router;
