require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./Routes/AuthRoute');
const menuRoutes = require('./Routes/menuRoutes');
const cartRoutes = require('./Routes/cartItemsRoutes');
const expensiesRoutes = require('./Routes/DailyExpensies');
const historyRoute = require('./Routes/HistoryRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // already handles JSON parsing

// Routes
app.use('/api/users', authRoute);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/expensies', expensiesRoutes);
app.use('/api/history', historyRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MONGODB CONNECTED!'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Default Route
app.get('/', (req, res) => {
  res.send(`Server is running on localhost:${PORT}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
