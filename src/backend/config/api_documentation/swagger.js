const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Betting App API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express application for Betting',
    },
  },
  apis: ['./api/routes/bets.js'], // Specify the path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
