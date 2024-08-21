const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const connectDB = require('./utils/db');

const filmRoutes = require('./routes/film.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const ratingRoutes = require('./routes/rating.route');
const recommendationRoutes = require('./routes/recommendation.route');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
connectDB();

app.use(authRoutes);
app.use(recommendationRoutes);
app.use(filmRoutes);
app.use(userRoutes);
app.use(ratingRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
