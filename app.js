const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'));

// Routes
app.use('/', (req, res) => {
  res.send('hello world!')
});

// Connect to database
mongoose.connect(
  process.env['DB_CONNECTION'],
  { useNewUrlParser: true },
  () => console.log('db connected')
);

app.listen(3001, () => console.log('app listening'));
