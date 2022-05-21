const User = require('../models/User');

const home = (req, res) => {
  res.render('index');
};

const register = (req, res) => {
  let user = new User(req.body);
  user.register();

  user.errors.length != 0 ? res.send(user.errors) : res.send('No Error');
};

const login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  home,
  register,
  login,
};
