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

/**
 * @swagger
 * components:
 *  schemas:
 *   Users:
 *    type: object
 *    required:
 *     - firstName
 *     - lastName
 *     - email
 *     - password
 *    properties:
 *     firstName:
 *      type: string
 *      description: The first name of the user
 *     lastName:
 *      type: string
 *      description: The last name of the user
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user (hashed)
 *    example:
 *     firstName: John
 *     lastName: Doe
 *     email: johndoe@mail.com
 *     password: 123456
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   User_SignIn:
 *    type: object
 *    required:
 *     - email
 *     - password
 *    properties:
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user (hashed)
 *    example:
 *     email: johndoe@mail.com
 *     password: 123456
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
