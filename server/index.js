const app = require('./app');
const express = require('express');
const path = require('path');

// app.get('/', (req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));
}

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started successfully');
});
