// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     content: { type: String, required: true }
// });

// const Todo = mongoose.model('Todo', todoSchema);

// module.exports = Todo;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Todo;
