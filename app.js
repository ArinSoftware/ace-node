const express = require('express');
const router = require('./router');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set statis files folder
app.use(express.static('public'));

app.use('/', router);

module.exports = app;
