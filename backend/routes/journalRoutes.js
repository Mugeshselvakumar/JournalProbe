const multer = require('multer');

// Use memoryStorage instead of diskStorage
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

const { addJournal, getJournals, getUserJournal, getJournalbyId, updateJournal, deleteJournal } = require('../controllers/journalController');
const router = require('express').Router();
const { checkUser } = require('../middlewares/auth');
const { categoriesFeedback } = require('../controllers/llmController');

router.post('/uploads', checkUser, uploads.single('image'), addJournal);
router.get('/getJournals', checkUser, getJournals);
router.get('/getUserJournal', checkUser, getUserJournal);
router.post('/getJournalbyId', checkUser, getJournalbyId);
router.patch('/updateJournal', checkUser, updateJournal);
router.post('/deleteJournal', checkUser, deleteJournal);
router.post('/generateblog', checkUser, categoriesFeedback);

module.exports = router;
