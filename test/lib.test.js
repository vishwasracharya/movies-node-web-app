require('../utils/db');
const assert = require('chai').assert;
const generateRandomFirstLastName = require('../controllers/functions/generateRandomFirstLastName');
const generateRandomEmail = require('../controllers/functions/generateRandomEmail');
const generateRandomPassword = require('../controllers/functions/generateRandomPassword');

describe('generator', () => {
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
});