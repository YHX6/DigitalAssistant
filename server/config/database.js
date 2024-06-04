const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // This will store the SQLite database in a file called 'database.sqlite'
});

module.exports = sequelize;
