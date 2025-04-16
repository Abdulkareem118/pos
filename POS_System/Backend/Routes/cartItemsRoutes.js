const express = require('express');
const router = express.Router();

let cart = [];

// Get cart summary
router.get('/', (req, res) => {
  res.json(cart);
});

// Add item to the cart
router.post('/add', (req, res) => {
  const { itemId, quantity } = req.body;

  const existingItem = cart.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ itemId, quantity });
  }

  res.status(201).json({ message: 'Item added to cart' });
});

// Update item quantity in cart
router.put('/update', (req, res) => {
  const { itemId, quantity } = req.body;

  const item = cart.find((i) => i.id === itemId);

  if (item) {
    item.quantity = quantity;
    res.json({ message: 'Cart updated' });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// Remove item from cart
router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id !== parseInt(id));

  res.json({ message: 'Item removed from cart' });
});

module.exports = router;
