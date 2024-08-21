const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const KEY = process.env.KEY || 'supersecret';

function createJSONToken(username) {
  return sign({ username }, KEY, { expiresIn: '1h' });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    res.status(401).json('Not Authenticated');
    return next();
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    res.status(401).json('Not Authenticated');
    return next();
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    res.status(401).json('Not Authenticated');
    return next();
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
