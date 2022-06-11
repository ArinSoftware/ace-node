const Photo = require('../models/Photo');

const getUploadPhotoPage = (req, res) => {
  res.status(200).render('upload-photo', {
    page_name: 'dashboard',
  });
};

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({ status: 'success', photo });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(201).json({ status: 'success', photo });
  } catch (err) {
    res.status(500).json({ status: 'fail', err });
  }
};

module.exports = {
  getUploadPhotoPage,
  createPhoto,
  getAllPhotos,
};
