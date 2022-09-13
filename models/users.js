const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MOVIES',
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: this._id, firstName: this.firstName, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const Users = mongoose.model('USER', userSchema);
module.exports = Users;
