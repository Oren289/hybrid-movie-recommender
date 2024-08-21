const express = require('express');
const Film = require('../model/film');

const router = express.Router();

router.get('/get-recom/:genreId?', async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const genrePattern = new RegExp(`{'id': ${genreId}, 'name': '[^']+'}`);
    const query = {
      genres: {
        $regex: genrePattern,
      },
    };
    const films = await Film.find(query).limit(15).sort({ popularity: -1 }).collation({ locale: 'en_US', numericOrdering: true });
    return res.status(200).json({ message: 'Success', data: films });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
