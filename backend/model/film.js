const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({}, { strict: false });

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
