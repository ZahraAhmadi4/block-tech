// Loading the things we need
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;

// Parse application
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Calling the templating engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));

// Getting the pages
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/like', (req, res) => {
  res.render('pages/like');
});

// 404 page
app.use((req, res) => {
  res.render('pages/404', {
    title: 'Bookmatch 404',
    message: '404 | This page was not found!',
  });
});

// Starting the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
