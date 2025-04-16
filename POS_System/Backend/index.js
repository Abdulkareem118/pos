const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 8080;
const authRoute = require('./Routes/AuthRoute');
const menuRoutes = require('./Routes/menuRoutes');
const cartRoutes = require('./Routes/cartItemsRoutes');
const expensiesRoutes = require('./Routes/DailyExpensies');
const historyRoute = require('./Routes/HistoryRoute');
const bodyParser = require('body-parser');

//Middlewares:
app.use(cors());
require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());

//Routes:

app.use('/api/users', authRoute);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/expensies', expensiesRoutes);
app.use('/api/history', historyRoute);


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=> console.log('MONGODB CONNECTED!'))
  .catch(err => console.log('Not connected'))

  app.listen(port,()=>{
    console.log('Server is running on port !')
})

