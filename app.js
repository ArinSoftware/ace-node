const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const photoRouter = require('./routes/photoRouter');
const pageRouter = require('./routes/pageRouter');
const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      dbName: 'ComplexApp',
    }),
  })
);

global.isLoggedIn = null;

app.use('*', (req, res, next) => {
  isLoggedIn = req.session.userId;
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set statis files folder
app.use(express.static('public'));

app.use('/', pageRouter);
app.use('/photos', photoRouter);

module.exports = app;
