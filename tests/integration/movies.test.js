const request = require('supertest');
const app = require('../../app');
const Movies = require('../../models/movies');
const isAuth = true, SITE_URL = process.env.SITE_URL;

describe(`GET ${SITE_URL}`, () => {
    it('should return a 200 response', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(302);
    });
});

if (isAuth) {
    describe(`POST ${SITE_URL}/api`, () => {
        describe(`/add-movie`, () => {
            it('should add a new document in DB & return a 200 response', async () => {
                const res = await request(app).post('/api/add-movie').send({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                });
                expect(res.statusCode).toBe(200);
            });
        });
    
        describe(`/edit-movie/:id`, () => {
            it('should edit a document in DB & return a 200 response', async () => {
                const movie = await Movies({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                })
                await movie.save();
                const res = await request(app).post(`/api/edit-movie/${movie._id}`).send({
                    title: 'Test Movie 2',
                    genre: 'Test Genre 2',
                    director: 'Test Director 2',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description 2'
                });
                expect(res.statusCode).toBe(200);
            });
        });
    
        describe(`/delete-movie/:id`, () => {
            it('should delete a document in DB & return a 200 response', async () => {
                const movie = await Movies({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                })
                await movie.save();
                const res = await request(app).delete(`/api/delete-movie/${movie._id}`);
                expect(res.statusCode).toBe(200);
            });
        });
    });
}

if (!isAuth) {
    describe(`POST ${SITE_URL}/api`, () => {
        describe(`/add-movie`, () => {
            it('should add a new document in DB & return a 302 response', async () => {
                const res = await request(app).post('/api/add-movie').send({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                });
                expect(res.statusCode).toBe(302);
            });
        });
    
        describe(`/edit-movie/:id`, () => {
            it('should edit a document in DB & return a 302 response', async () => {
                const movie = await Movies({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                })
                await movie.save();
                const res = await request(app).post(`/api/edit-movie/${movie._id}`).send({
                    title: 'Test Movie 2',
                    genre: 'Test Genre 2',
                    director: 'Test Director 2',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description 2'
                });
                expect(res.statusCode).toBe(302);
            });
        });
    
        describe(`/delete-movie/:id`, () => {
            it('should delete a document in DB & return a 200 response', async () => {
                const movie = await Movies({
                    title: 'Test Movie',
                    genre: 'Test Genre',
                    director: 'Test Director',
                    year: 2020,
                    rating: 5,
                    image: 'https://via.placeholder.com/150',
                    description: 'Test Description'
                })
                await movie.save();
                const res = await request(app).post(`/api/delete-movie/${movie._id}`);
                expect(res.statusCode).toBe(302);
            });
        });
    });
}