const Journal = require('../models/Journal');

exports.likeJournal = async (req, res) => {
  try {
    const { id } = req.body;
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    journal.likes += 1;
    await journal.save();
    res.status(200).json({ message: 'Journal liked', likes: journal.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewJournal = async (req, res) => {
  try {
    const { id } = req.body;
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    journal.views += 1;
    await journal.save();
    res.status(200).json({ message: 'Journal viewed', views: journal.views });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
