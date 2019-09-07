const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/words', require('./routes/words'));

// Connect to database
mongoose.connect(
  process.env['DB_CONNECTION'],
  { useNewUrlParser: true },
  () => console.log('db connected')
);

app.listen(3001, () => console.log('app listening'));
