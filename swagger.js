const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 Node.js Project W03-W04',
    description: 'API documentation for the CSE341 Node.js Project W03-W04',
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);