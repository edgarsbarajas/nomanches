const express = require('express');
const app = express();

// Middlewares

// Routes
app.use('/', (req, res) => {
  res.send('hello world!')
});

app.listen(3001, () => console.log('app listening'));
