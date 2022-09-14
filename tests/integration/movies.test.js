/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-underscore-dangle */
/* Modules */
const request = require('supertest');
const app = require('../../app');
const Movies = require('../../models/movies');
const Users = require('../../models/users');

/* Controllers */
const generateRandomEmail = require('../../controllers/functions/generateRandomEmail');
const generateRandomPassword = require('../../controllers/functions/generateRandomPassword');
const generateRandomFirstLastName = require('../../controllers/functions/generateRandomFirstLastName');

/* Constants */
const isAuth = true;
const { SITE_URL } = process.env;
const TEMP_USER = {
  firstName: generateRandomFirstLastName(),
  lastName: generateRandomFirstLastName(),
  email: generateRandomEmail(),
  password: generateRandomPassword(),
};
const TEMP_MOVIE = {
  title: 'Test Movie',
  genre: 'Test Genre',
  director: 'Test Director',
  year: 2020,
  rating: 5,
  image: 'https://via.placeholder.com/150',
  description: 'Test Description',
};

/* Reusable Methods */
const createUser = async () => {
  const user = new Users(TEMP_USER);
  await user.save();
  return user;
};
const createMovie = async () => {
  const movie = new Movies(TEMP_MOVIE);
  await movie.save();
  return movie;
};

/* Test Cases */
describe(`GET ${SITE_URL}`, () => {
  it('should return a 200 response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(302);
  });
});

if (isAuth) {
  describe(`POST ${SITE_URL}/api`, () => {
    beforeEach(async () => {});

    afterEach(async () => {
      await Movies.deleteMany({});
      await Users.deleteMany({});
    });

    describe(`/add-movie`, () => {
      it('should add a new document in DB & return a 200 response', async () => {
        const res = await request(app).post('/api/add-movie').send(TEMP_MOVIE);
        expect(res.statusCode).toBe(200);
      });
    });

    describe(`/edit-movie/:id`, () => {
      it('should edit a document in DB & return a 200 response', async () => {
        const movie = await Movies(TEMP_MOVIE);
        await movie.save();
        const res = await request(app)
          .post(`/api/edit-movie/${movie._id}`)
          .send({
            title: 'Test Movie 2',
            genre: 'Test Genre 2',
            director: 'Test Director 2',
            year: 2020,
            rating: 5,
            image: 'https://via.placeholder.com/150',
            description: 'Test Description 2',
          });
        expect(res.statusCode).toBe(200);
      });
    });

    describe(`/delete-movie/:id`, () => {
      it('should delete a document in DB & return a 200 response', async () => {
        const movie = await createMovie();
        const res = await request(app).delete(`/api/delete-movie/${movie._id}`);
        expect(res.statusCode).toBe(200);
      });
    });

    describe(`/rent-movie/:id/:uid`, () => {
      it('should rent a movie & update a  document in DB & return a 200 response', async () => {
        const user = await createUser();
        const movie = await createMovie();
        const res = await request(app).post(
          `/api/rent-movie/${movie._id}/${user._id}`
        );
        expect(res.statusCode).toBe(200);
      });

      it('should return a 400 response if movie.quantity is less than or equal to 0', async () => {
        const user = await createUser();
        const movie = await createMovie();
        movie.quantity = 0;
        await movie.save();
        const res = await request(app).post(
          `/api/rent-movie/${movie._id}/${user._id}`
        );
        expect(res.statusCode).toBe(400);
      });
    });

    describe(`/return-movie/:id/:uid`, () => {
      it('should return a movie & update a  document in DB & return a 200 response', async () => {
        const user = await createUser();
        const movie = await createMovie();
        const res = await request(app).post(
          `/api/return-movie/${movie._id}/${user._id}`
        );
        expect(res.statusCode).toBe(200);
      });

      it('should return movie not found & return a 404 response', async () => {
        const user = await createUser();
        const res = await request(app).post(
          `/api/return-movie/5f6b7c8d9e0f1011a2b3c4d5/${user._id}`
        );
        expect(res.statusCode).toBe(404);
      });
    });
  });
}

if (!isAuth) {
  describe(`POST ${SITE_URL}/api`, () => {
    beforeEach(async () => {});

    afterEach(async () => {
      await Movies.deleteMany({});
      await Users.deleteMany({});
    });

    describe(`/add-movie`, () => {
      it('should add a new document in DB & return a 302 response', async () => {
        const res = await request(app).post('/api/add-movie').send(TEMP_MOVIE);
        expect(res.statusCode).toBe(302);
      });
    });

    describe(`/edit-movie/:id`, () => {
      it('should edit a document in DB & return a 302 response', async () => {
        const movie = await Movies(TEMP_MOVIE);
        await movie.save();
        const res = await request(app)
          .post(`/api/edit-movie/${movie._id}`)
          .send({
            title: 'Test Movie 2',
            genre: 'Test Genre 2',
            director: 'Test Director 2',
            year: 2020,
            rating: 5,
            image: 'https://via.placeholder.com/150',
            description: 'Test Description 2',
          });
        expect(res.statusCode).toBe(302);
      });
    });

    describe(`/delete-movie/:id`, () => {
      it('should delete a document in DB & return a 200 response', async () => {
        const movie = await Movies(TEMP_MOVIE);
        await movie.save();
        const res = await request(app).post(`/api/delete-movie/${movie._id}`);
        expect(res.statusCode).toBe(302);
      });
    });
  });
}
