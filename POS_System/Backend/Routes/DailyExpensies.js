const express = require('express');
const router = express.Router();
const Expense = require('../Models/DailyExpensies');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new expense
router.post('/', async (req, res) => {
  const { item, price, date, time } = req.body;
  try {
    const newExpense = new Expense({ item, price, date, time });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
});

// PUT update an expense
router.put('/:id', async (req, res) => {
  const { item, price, date, time } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { item, price, date, time },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed' });
  }
});

// DELETE an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete Failed' });
  }
});

module.exports = router;