/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-underscore-dangle */
/* Controllers */
const generateRandomEmail = require('../../controllers/functions/generateRandomEmail');
const generateRandomPassword = require('../../controllers/functions/generateRandomPassword');
const generateRandomFirstLastName = require('../../controllers/functions/generateRandomFirstLastName');

/* A test suite. */
describe(`Generators`, () => {
  /* Testing the function generateRandomEmail() to see if it returns a string and if it contains an @
    symbol. */
  describe('Random Email', () => {
    it('should return a string', () => {
      expect(typeof generateRandomEmail()).toBe('string');
    });
    it('should return a string with @', () => {
      expect(generateRandomEmail()).toContain('@');
    });
  });
  /* Testing the function generateRandomPassword() to see if it returns a string. */
  describe('Random Password', () => {
    it('should return a string', () => {
      expect(typeof generateRandomPassword()).toBe('string');
    });
  });
  /* Testing the function generateRandomFirstLastName() to see if it returns a string. */
  describe('Random First Name', () => {
    it('should return a string', () => {
      expect(typeof generateRandomFirstLastName()).toBe('string');
    });
  });
});
