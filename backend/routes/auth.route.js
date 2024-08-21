const express = require('express');
const { createJSONToken, isValidPassword, getTokenPayload } = require('../utils/auth');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/user');

const router = express.Router();

router.post('/signin', [body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters minimum')], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(401).json(errors);
  }
  try {
    const username = req.body.username.trim();
    const enteredPassword = req.body.password.trim();

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const storedPassword = user.password;
    const passwordValid = await isValidPassword(enteredPassword, storedPassword);

    if (!passwordValid) {
      return res.status(422).json({ message: 'Wrong username or password' });
    }

    const token = createJSONToken(username);
    res.json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post(
  '/signup',
  [
    body('username')
      .notEmpty()
      .withMessage('Username tidak boleh kosong')
      .custom(async (value) => {
        const duplicateUsername = await User.findOne({ username: value });
        if (duplicateUsername) {
          throw new Error('Username is already used, pick another!');
        }
      }),
    body('email')
      .isEmail()
      .withMessage('Invalid email')
      .custom(async (value) => {
        const duplicateEmail = await User.findOne({ email: value });
        if (duplicateEmail) {
          throw new Error('Email is already used, pick another!');
        }
      }),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters minimum'),
    body('dob').notEmpty().withMessage('Tanggal lahir tidak boleh kosong'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json(errors);
    }
    try {
      const { username, email, password, dob } = req.body;

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const query = {
        username: username,
        email: email,
        password: hashedPassword,
        dateofbirth: dob,
      };

      const createdUser = await User.create(query);
      const authToken = createJSONToken(createdUser.username);

      return res.status(201).json({
        message: 'Signup success',
        user: createdUser,
        token: authToken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: 'Server error',
      });
    }
  }
);

module.exports = router;
