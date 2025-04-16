const express = require('express');
const router = express.Router();
const History = require('../Models/HistoryModels');

// POST - Save cart to history
router.post('/', async (req, res) => {
  try {
    const { items, total } = req.body;
    const newHistory = new History({ items, total });
    await newHistory.save();
    res.status(201).json({ message: 'History saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save history', error: err.message });
  }
});

// GET - Retrieve history
router.get('/', async (req, res) => {
  try {
    const histories = await History.find().sort({ date: -1 });
    res.status(200).json(histories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history', error: err.message });
  }
});

module.exports = router;
