/* Controllers */
const generateRamdomemail = require('../../controllers/functions/generateRamdomemail');
const generateRandomPassword = require('../../controllers/functions/generateRandomPassword');
const generateRandomFirstLastName = require('../../controllers/functions/generateRandomFirstLastName');

/* Constants */
const isAuth = true, SITE_URL = process.env.SITE_URL;

describe(`Generators`, () => {
    describe('Random Email', () => { 
        it('should return a string', () => {
            expect(typeof generateRamdomemail()).toBe('string');
        });
        it('should return a string with @', () => {
            expect(generateRamdomemail()).toContain('@');
        });
    });
    describe('Random Password', () => {
        it('should return a string', () => {
            expect(typeof generateRandomPassword()).toBe('string');
        });
    });
    describe('Random First Name', () => {
        it('should return a string', () => {
            expect(typeof generateRandomFirstLastName()).toBe('string');
        });
    });
});