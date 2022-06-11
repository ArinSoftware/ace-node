const Photo = require('../models/Photo');

exports.getHomePage = async (req, res) => {
  try {
    console.log('SESSION USER ID::', req.session.userId);

    const photos = await Photo.find().limit(2);

    console.log('PHOTOS::', photos);

    res.status(200).render('index', {
      page_name: 'index',
      photos,
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
