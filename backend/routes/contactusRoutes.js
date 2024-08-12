// routes/contactusRoutes.js
const express = require('express');
const { createContact } = require('../controllers/contactus');

const router = express.Router();

router.post('/', createContact);

module.exports = router;
