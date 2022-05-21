const bcrypt = require('bcryptjs');
const usersCollection = require('../db').collection('users');
const validator = require('validator');

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  const { firstname, lastname, username, email, password } = this.data;
  if (typeof firstname != 'string') {
    firstname = '';
  }
  if (typeof lastname != 'string') {
    lastname = '';
  }
  if (typeof username != 'string') {
    username = '';
  }
  if (typeof email != 'string') {
    email = '';
  }
  if (typeof password != 'string') {
    password = '';
  }

  //get rid of any unnecessary properties

  this.data = {
    firstname: this.data.firstname.trim().toLowerCase(),
    lastname: this.data.lastname.trim().toLowerCase(),
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
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

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve('Congrats!!');
        } else {
          reject('Invalid username / password');
        }
      })
      .catch(() => {
        reject('Please try again later');
      });
  });
};

User.prototype.register = function () {
  // Validate user data
  this.cleanUp();
  this.validate();

  if (!this.errors.length) {
    // hash password
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);
    usersCollection.insertOne(this.data);
  }
};

module.exports = User;
