const User = require('../models/User');

const home = (req, res) => {
  res.render('index');
};

const register = (req, res) => {
  let user = new User(req.body);
  user.register();

  user.errors.length != 0 ? res.send(user.errors) : res.send('No Error');
};

module.exports = {
  home,
  register,
};
