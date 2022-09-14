/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-underscore-dangle */
const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const generateRandomFirstLastName = require('../../controllers/functions/generateRandomFirstLastName');
const generateRandomEmail = require('../../controllers/functions/generateRandomEmail');
const generateRandomPassword = require('../../controllers/functions/generateRandomPassword');
const Users = require('../../models/users');

const TEMP_USER = {
  firstName: generateRandomFirstLastName(),
  lastName: generateRandomFirstLastName(),
  email: generateRandomEmail(),
  password: generateRandomPassword(),
};
/* Reusable Methods */
const createUser = async () => {
  const user = new Users(TEMP_USER);
  await user.save();
  return user;
};
describe('Generate', () => {
  describe('Random First Last Name', () => {
    it('should return a string', () => {
      const result = generateRandomFirstLastName();
      assert.typeOf(result, 'string');
    });
  });
  describe('Random Email', () => {
    it('should return a string', () => {
      const result = generateRandomEmail();
      assert.typeOf(result, 'string');
    });
  });
  describe('Random Password', () => {
    it('should return a string', () => {
      const result = generateRandomPassword();
      assert.typeOf(result, 'string');
    });
  });
  describe('Token', () => {
    it('should return a string', () => {
      const user = createUser();
      const token = jwt.sign(
        { _id: user._id, firstName: user.firstName, isAdmin: user.isAdmin },
        'secret'
      );
      assert.typeOf(token, 'string');
    });
  });
});

describe('Decode JWT token', () => {
  it('should return a object', async () => {
    const user = createUser();
    const token = jwt.sign(
      { _id: user._id, firstName: user.firstName, isAdmin: user.isAdmin },
      'secret'
    );
    const result = jwt.verify(token, 'secret');
    assert.typeOf(result, 'object');
  });
});
