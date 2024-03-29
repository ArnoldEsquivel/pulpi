const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Transactions',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from a MySQL database and returns it in JSON format.',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [
        './src/api/routes/*.js',
        './src/api/controllers/*.js',
        './src/api/models/*.js'
    ],
};

module.exports = options;
