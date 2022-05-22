const express = require('express');
const session = require('express-session');
const app = express();

app.use(
  session({
    secret: 'JS is NOT cool!',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set statis files folder
app.use(express.static('public'));

const router = require('./router');
app.use('/', router);

module.exports = app;
