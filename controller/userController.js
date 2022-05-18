const home = (req, res) => {
  res.render('index');
};

const register = (req, res) => {
  console.log(req.body);
  res.send('Thanks for trying to register');
};

module.exports = {
  home,
  register,
};
