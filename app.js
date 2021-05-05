// Loading the things we need
const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

// Setup static folder
app.use(express.static('static'));
app.use(express.static(path.join(__dirname, 'views')));

// templating engine
app.set('view engine', 'ejs');

// Navigation
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  const users = [
    { name: 'John', book: 'The Maze Runner' },
    { name: 'Marilynn', book: 'The Maze Runner' },
    { name: 'Samantha', book: 'Normal People' },
    { name: 'Daniel', book: 'Normal People' },
  ];

  res.render('layouts/about', {
    users,
  });
});

app.use((req, res) => {
  res.render('404', {
    title: 'Bookmatch 404',
    message: '404 | This page was not found!',
  });
});

// Starting the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
