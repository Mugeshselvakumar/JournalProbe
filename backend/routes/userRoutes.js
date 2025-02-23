const router = require('express').Router();
const {signup, login,getUser,cron} = require('../controllers/userController');
const {checkUser}  = require('../middlewares/auth')

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUser',checkUser,getUser)
router.get('/cron',cron)


module.exports = router;