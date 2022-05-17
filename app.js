const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// set statis files folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
