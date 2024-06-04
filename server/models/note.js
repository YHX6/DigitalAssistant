// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     content: { type: String, required: true }
// });

// const Note = mongoose.model('Note', noteSchema);

// module.exports = Note;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define('Note', {
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

module.exports = Note;

