const validator = require('validator');

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.validate = function () {
  const { firstname, lastname, username, email, password } = this.data;
  const nameRegex = /^[a-zA-Z ]{2,30}$/;

  if (firstname == '') this.errors.push('You must enter your firstname');
  if (!nameRegex.test(firstname))
    this.errors.push('You must enter your valid first name');

  if (lastname == '') this.errors.push('You must enter your lastname');
  if (!nameRegex.test(lastname))
    this.errors.push('You must enter your valid lastname');

  if (username == '') this.errors.push('You must enter your username');

  if (username != '' && !validator.isAlphanumeric(username))
    this.errors.push('Username can only contains letters and numbers');

  if (!validator.isEmail(email)) this.errors.push('You must enter your email');

  if (password == '') this.errors.push('You must enter your password');

  if (password.length > 0 && password.length < 8)
    this.errors.push('Password must be at least 8 characters');

  if (password.length > 25)
    this.errors.push('Password must be less than 25 characters');

  if (username.length > 0 && password.length < 4)
    this.errors.push('Username must be at least 4 characters');

  if (username.length > 25)
    this.errors.push('Username must be less than 25 characters');
};

User.prototype.register = function () {
  // Validate user data
  this.validate();
};

module.exports = User;
