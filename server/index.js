const app = require('./app');
const express = require('express');
const path = require('path');

const port = process.env.PORT;

// app.get('/', (req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
// });

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static('client/build'));
// }

// // Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, '/../dist')));
app.use('/server', express.static(__dirname + '/server'));
app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log('Server started successfully');
});
