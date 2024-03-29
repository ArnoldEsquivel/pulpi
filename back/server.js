require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const sequelize = require('./src/config/db');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }).catch((error) => {
        console.error('Error synchronizing database:', error);
    });
