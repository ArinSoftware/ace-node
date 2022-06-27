const Photo = require('../models/Photo');
const User = require('../models/User');

const getUploadPhotoPage = (req, res) => {
  res.status(200).render('upload-photo', {
    page_name: 'dashboard',
  });
};

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: req.session.userId,
    });
    res.status(201).redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json({ status: 'success', photos });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById({ _id: req.params.id }).populate('user');

    let isOwnerLoggedIn = false;
    if (req.session.userId) {
      const user = await User.findById({ _id: req.session.userId });
      isOwnerLoggedIn = String(user._id) == String(photo.user._id);
    }

    console.log('isOwnerLoggedIn', isOwnerLoggedIn);

    res.status(200).render('photo', {
      photo,
      isOwnerLoggedIn,
      page_name: 'photos',
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const deletePhoto = async (req, res) => {
  try {
    await Photo.findOneAndRemove({ _id: req.params.id });
    res.status(200).redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.status(200).render('edit-photo', {
      photo,
      page_name: 'photos',
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const putPhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.name = req.body.name;
    photo.description = req.body.description;
    photo.save();
    res.status(200).redirect(`/photos/${req.params.id}`);
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

module.exports = {
  getUploadPhotoPage,
  createPhoto,
  getAllPhotos,
  getPhoto,
  deletePhoto,
  updatePhoto,
  putPhoto,
};
