const express = require('express');
const Film = require('../model/film');
const Genre = require('../model/genre');
const Rating = require('../model/rating');
const { round } = require('../utils/math');

const router = express.Router();

router.get('/get-rating/:filmId&:userId', async (req, res) => {
  try {
    const filmId = req.params.filmId;
    const userId = req.params.userId;

    const ratingExist = await Rating.findOne({ userId: userId, movieId: filmId });

    if (ratingExist) {
      return res.status(200).json({
        message: 'Success',
        data: ratingExist.rating,
      });
    }

    return res.status(200).json({
      message: 'Rating not existed',
      data: null,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

router.post('/store-rating', async (req, res) => {
  try {
    const { username, movieId, rating, _id } = req.body;

    const query = {
      userId: username,
      movieId: movieId,
      rating: rating / 2, // divide by 2 to convert it to 1-5 scale
      films: _id,
      timestamp: Date.now(),
    };

    // check if rating exist
    const ratingExist = await Rating.findOne({ userId: username, movieId: movieId });

    if (ratingExist) {
      return res.status(403).json({
        message: 'Rating already existed',
      });
    }

    const storedRating = await Rating.create(query);

    // update film rating count and value
    const film = await Film.findOne({ id: movieId });
    const newVoteCount = parseFloat(film.vote_count) + 1.0;
    const newVoteAverage = (parseFloat(film.vote_average) * parseFloat(film.vote_count) + rating) / newVoteCount;
    await Film.updateOne({ id: movieId }, { $set: { vote_average: round(newVoteAverage, 1), vote_count: newVoteCount } });

    return res.status(201).json({
      message: 'Success',
      data: storedRating,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

router.post('/update-rating', async (req, res) => {
  try {
    const { filmId, newRating, prevRating, _id } = req.body;

    console.log(_id);

    const updateRating = await Rating.updateOne({ _id: _id }, { $set: { rating: newRating / 2, timestamp: Date.now() } });

    // update film rating count and value
    const film = await Film.findOne({ id: filmId });
    const newVoteAverage = (parseFloat(film.vote_average) * parseFloat(film.vote_count) - prevRating + newRating) / film.vote_count;
    console.log(newVoteAverage);
    await Film.updateOne({ id: filmId }, { $set: { vote_average: round(newVoteAverage, 1) } });

    return res.status(200).json({
      message: 'Success',
      data: updateRating,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

module.exports = router;
