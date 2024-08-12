const express = require('express');
const router = express.Router();
const { likeJournal, viewJournal } = require('../controllers/likesController');
const authenticate = require('../middlewares/authenticate');

router.post('/likeJournal', authenticate, likeJournal);
router.post('/viewJournal', authenticate, viewJournal);

module.exports = router;
