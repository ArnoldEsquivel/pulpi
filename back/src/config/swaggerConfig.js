const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Transactions',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from a MySQL database and returns it in JSON format.',
        contact: {
            name: 'Arnold Esquivel',
            url: 'https://github.com/ArnoldEsquivel'
        },
    }
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/docs/*.yaml',],
};

module.exports = options;
