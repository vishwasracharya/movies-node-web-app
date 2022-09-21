module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API',
      version: '1.0.0',
      description:
        'A Web App which created during the learning process of Node.Js.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};
