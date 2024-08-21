const express = require('express');
const { checkAuth } = require('../utils/auth');
const User = require('../model/user');

const router = express.Router();

router.use(checkAuth);

router.get('/get-user-profile', async (req, res) => {
  try {
    const userData = await User.findOne({ username: req.token.username }).select('-_id');
    return res.status(200).json({ message: 'Success', user: userData });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.post('/store-user-genres', async (req, res) => {
  try {
    const { username, genres } = req.body;

    const storedGenres = await User.findOneAndUpdate({ username: username }, { preferredGenres: genres });

    return res.status(200).json({
      message: 'Success',
      data: storedGenres,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

module.exports = router;
