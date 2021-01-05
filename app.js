const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', require('./controllers/auth'));
app.use('/users', require('./controllers/users'));
app.use('/words', require('./controllers/words'));
app.use('/votes', require('./controllers/votes'));

// Connect to database
// Previous DB Connect: DB_CONNECTION=mongodb://edgar:spanglish69@ds217438.mlab.com:17438/spanglish
mongoose.connect(
  process.env['DB_CONNECTION'],
  { useNewUrlParser: true },
  () => console.log('db connected')
);

mongoose.set('useFindAndModify', false);

app.listen(3001, () => console.log('app listening'));
