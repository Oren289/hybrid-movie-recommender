const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
