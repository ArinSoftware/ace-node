const User = require('../models/User');
const Photo = require('../models/Photo');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userId = user._id;
            res.status(200).redirect('/dashboard');
          }
        });
      }
    }).clone();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  console.log('auth Controller');
  req.session.destroy((err) => {
    if (err) {
      console.log('ERR::', err);
    } else {
      console.log('TESTOOOO');
      res.redirect('/');
    }
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  const photos = await Photo.find({ user: req.session.userId });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    photos,
    messages: req.flash('flashMessages'),
  });
};
