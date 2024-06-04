const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const noteRoutes = require("./routes/noteRouter");
const todoRoutes = require("./routes/todoRouter");
require('dotenv').config();

const app = express();

// Synchronize all defined models to the DB.
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create tables, shutting down...', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/todos', todoRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
