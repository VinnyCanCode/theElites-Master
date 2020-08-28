const app = require('./app');
const express = require('express');

const port = process.env.PORT;

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('react-ui/build'));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'react-ui', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Server started successfully');
});
