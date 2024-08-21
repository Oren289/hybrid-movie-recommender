const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({}, { strict: false });

const Credit = mongoose.model('credit', creditSchema);

module.exports = Credit;
