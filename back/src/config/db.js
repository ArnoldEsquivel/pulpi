require('dotenv').config();
const { Sequelize } = require('sequelize');

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    define: {
        freezeTableName: false
    }
});

module.exports = sequelize;
