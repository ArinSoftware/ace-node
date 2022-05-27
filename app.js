const express = require('express');
const session = require('express-session');
const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

global.isLoggedIn = null;

app.use('*', (req, res, next) => {
  isLoggedIn = req.session.userId;
  next();
});

const router = require('./router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set statis files folder
app.use(express.static('public'));

app.use('/', router);

module.exports = app;
