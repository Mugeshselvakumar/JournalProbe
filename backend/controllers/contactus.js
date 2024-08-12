
const Contact = require('../models/contactSchema');

const createContact = async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newContact = new Contact({ fullName, email, message });
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContact
};
