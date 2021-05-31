require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const passport = require('passport'); // is needed for our feature (login, logout).
const LocalStrategy = require('passport-local'); // is needed to authenticate using username and password.
const session = require('express-session'); // every user will be assigned a unique session.
const mongoose = require('mongoose');

const { url } = require('inspector');
const User = require('./models/user');

// Hier wordt mijn templating engine en bodyparser aangeroepen.
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));

// BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecten met database

mongoose.connect('mongodb://localhost:27017/Bookmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Testen of ik gekoppeld ben met mongoose.
console.log(mongoose.connection.readyState);

const db = mongoose.connection;
// eslint-disable-next-line no-unused-vars
db.once('open', (_) => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', url);
});

app.use(
  session({
    secret: 'Word', // decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(User.serializeUser()); // session encoding
passport.deserializeUser(User.deserializeUser()); // session decoding
passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

// Current User
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('index');
}

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/userprofile', (req, res) => {
  res.render('pages/userprofile');
});

app.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/userprofile',
    failureRedirect: '/',
  }),
  (req, res) => {}
);

app.get('/register', (req, res) => {
  res.render('pages/register');
  console.log('haaa');
});

app.post('/', (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      book: req.body.book,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render('/register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('userprofile');
      });
    }
  );
});

app.use((req, res, next) => {
  res.renderWithData = function (view, model, data) {
    res.render(view, model, (err, viewString) => {
      data.view = viewString;
      res.json(data);
    });
  };
  next();
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
