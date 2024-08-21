const express = require('express');
const Film = require('../model/film');
const Rating = require('../model/rating');
const Genre = require('../model/genre');
const { checkAuth } = require('../utils/auth');
const { round } = require('../utils/math');
const MovieDropdownSelection = require('../model/movieDropdown');

const router = express.Router();

router.get('/get-film/detail/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const film = await Film.findOne({ id: id }).sort('popularity');
    return res.status(200).json({ message: 'Success', data: film });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get('/get-paginated-films/:page&:searchParams?', async (req, res) => {
  try {
    const ITEMS_PER_PAGE = 24;
    const page = req.params.page || 1;
    const searchParams = req.params.searchParams;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    if (searchParams !== undefined) {
      const paginatedFilms = await Film.find({ title: { $regex: searchParams || '', $options: 'i' } })
        .limit(ITEMS_PER_PAGE)
        .skip(skip)
        .sort({ popularity: -1 })
        .collation({ locale: 'en_US', numericOrdering: true });

      const countQuery = await Film.find({ title: { $regex: searchParams || '', $options: 'i' } });
      const count = countQuery.length;
      const pageCount = count / ITEMS_PER_PAGE;
      return res.status(200).json({ message: 'Success', pagination: { count, pageCount }, data: paginatedFilms });
    }

    const count = await Film.estimatedDocumentCount();
    const pageCount = count / ITEMS_PER_PAGE;

    const paginatedFilms = await Film.find().limit(ITEMS_PER_PAGE).skip(skip).sort({ popularity: -1 }).collation({ locale: 'en_US', numericOrdering: true });

    return res.status(200).json({ message: 'Success', pagination: { count, pageCount }, data: paginatedFilms });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get('/get-film-count', async (req, res) => {
  try {
    const count = await Film.estimatedDocumentCount();
    return res.status(200).json({ message: 'Success', data: count });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get('/get-genres', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    let processedGenres = [];
    genres.map((genre) => {
      processedGenres.push({
        value: genre.id,
        label: genre.name,
      });
    });

    return res.status(200).json({ message: 'Success', data: processedGenres });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get('/get-film-dropdown/:searchParams?', async (req, res) => {
  try {
    const searchParams = req.params.searchParams;
    console.log(searchParams);
    if (searchParams !== undefined) {
      const dropdown = await MovieDropdownSelection.find({ label: { $regex: searchParams || '', $options: 'i' } });
      return res.status(200).json({ message: 'Success', data: dropdown });
    }
    const dropdown = await MovieDropdownSelection.find();
    return res.status(200).json({ message: 'Success', data: dropdown });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.use(checkAuth);

router.get('/get-rated-films/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const films = await Rating.find({ userId: userId }).populate('films');

    return res.status(200).json({ message: 'Success', data: films });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.delete('/delete-rated-films/:id', async (req, res) => {
  try {
    const _id = req.params.id;

    const rating = await Rating.find({ _id: _id });
    const film = await Film.find({ id: parseInt(rating[0].movieId) });

    const newVoteCount = parseFloat(film[0].vote_count) - 1.0;
    const newVoteAverage = (parseFloat(film[0].vote_average) * parseFloat(film[0].vote_count) - rating[0].rating) / newVoteCount;
    console.log(newVoteAverage);
    console.log(newVoteCount);
    await Film.updateOne({ id: rating[0].movieId }, { $set: { vote_average: round(newVoteAverage, 1), vote_count: newVoteCount } });

    await Rating.deleteOne({ _id: _id });

    return res.status(200).json({ message: 'Rating successfully deleted' });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
