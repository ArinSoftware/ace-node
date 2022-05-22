const User = require('../models/User');

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();

  user.errors.length != 0 ? res.send(user.errors) : res.send('No Error');
};

exports.login = (req, res) => {
  let user = new User(req.body);
  console.log('USER', user);
  console.log('USER.DATA', user.data);
  user
    .login()
    .then(function (result) {
      req.session.username = user.data.username;
      console.log('req.session.username', req.session.username);
      req.session.test = 'test';
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.home = function (req, res) {
  console.log('REQ:::', req.session);
  console.log('req.session.user in HOME', req.session.username);
  if (req.session.user) {
    res.send('Welcome to the actuall app');
  } else {
    res.render('index');
  }
};
