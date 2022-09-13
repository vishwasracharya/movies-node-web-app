require('../../utils/db');
/* Controllers */
const generateRandomEmail = require('../../controllers/functions/generateRandomEmail');
const generateRandomPassword = require('../../controllers/functions/generateRandomPassword');
const generateRandomFirstLastName = require('../../controllers/functions/generateRandomFirstLastName');

/* Constants */
const isAuth = true, SITE_URL = process.env.SITE_URL;

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