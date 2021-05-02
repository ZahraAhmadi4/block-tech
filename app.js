// Loading the things we need
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;



// Setup static folder
app.use(express.static('static'));
app.use('/css', express.static(__dirname + 'static/css'));



// Setting the templating engine to ejs
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
})



// Navigation
app.get('/', (req, res) => {
  res.render('index', {title: 'Bookmatch.'})
});

app.get('layouts', (req, res) => {
  res.render('width')
});

// 404 page
app.use((req, res, next) => {
  res.render('404', { title: 'Bookmatch 404', message: '404 | This page was not found!'})
})

//Starting the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


