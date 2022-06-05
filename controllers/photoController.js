exports.getUploadPhotoPage = (req, res) => {
  res.status(200).render('upload-photo', {
    page_name: 'dashboard',
  });
};
