require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');

// Database connection
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

/*
// bookmatch is de naam van mijn MongoDB database en bookmatchpeople is de naam van mijn collection
const db = connection.db('Bookmatch');
const personenCollection = db.collection('bookmatchpeople');*/

// Hier wordt mijn templating engine en bodyparser aangeroepen.
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

// Naar de like pagina gaan als je gebruikers geliket hebt.
app.use((req, res) => {
  res.render('pages/like');
});

app.post('/like', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  res.send('data saved succesfully');
});

// 404
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
