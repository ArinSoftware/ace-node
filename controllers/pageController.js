const Photo = require('../models/Photo');

exports.getHomePage = async (req, res) => {
  try {
    console.log('SESSION USER ID::', req.session.userId);

    const photos = await Photo.find({}).sort({ uploadedAt: 'desc' }).limit(2);
    res.status(200).render('index', {
      page_name: 'index',
      photos,
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

exports.getPhotosPage = async (req, res) => {
  try {
    const photos = await Photo.find({}).sort({ uploadedAt: 'desc' });
    res.status(200).render('photos', {
      page_name: 'photos',
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
