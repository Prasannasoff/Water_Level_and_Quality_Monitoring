const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
