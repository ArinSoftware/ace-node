const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
