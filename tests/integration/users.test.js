/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-underscore-dangle */
/* Modules */
const request = require('supertest');
const app = require('../../app');
const Users = require('../../models/users');

/* Constants */
const { SITE_URL } = process.env.SITE_URL;

/* Test Cases */
describe(`GET ${SITE_URL}`, () => {
  describe(`/signout`, () => {
    it('should return a 302 response', async () => {
      const res = await request(app).get('/auth/signout');
      expect(res.statusCode).toBe(302);
    });
  });
});

describe(`POST ${SITE_URL}/auth`, () => {
  beforeEach(async () => {});

  afterEach(async () => {
    await Users.deleteMany({});
  });

  describe(`/signup`, () => {
    it('should add a new document in DB & return a 302 response', async () => {
      const res = await request(app).post('/auth/signup').send({
        firstName: 'Test',
        lastName: 'Name',
        email: 'test@gmail.com',
        password: 'test@gmail.com',
      });
      expect(res.statusCode).toBe(302);
    });
  });

  describe(`/signin`, () => {
    it('should return a 302 response', async () => {
      const res = await request(app).post('/auth/signin').send({
        email: 'test@gmail.com',
        password: 'test@gmail.com',
      });
      expect(res.statusCode).toBe(302);
    });
  });
});
