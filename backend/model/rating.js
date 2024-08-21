const mongoose = require('mongoose');
const Film = require('../model/film');

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
});

const Rating = mongoose.model('rating', ratingSchema);

module.exports = Rating;
