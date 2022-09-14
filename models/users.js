const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
/**
 * Users Model Schema
 * @schema Users_Schema
 * @property {string} firstName - required
 * @property {string} lastName - required
 * @property {string} email - required
 * @property {string} password - required
 * @property {Boolean} isAdmin - required
 * @property {Array<ObjectId>} movies - required
 * @property {date} created_at - default Date.now
 * @property {date} updated_at - default Date.now
 */
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
