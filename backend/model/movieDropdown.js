const mongoose = require('mongoose');

// Define the schema for movie dropdown selection
const movieDropdownSelectionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    // Add any other fields that are part of your documents
  },
  {
    collection: 'movie_dropdown_selection', // Explicitly specify the collection name
  }
);

// Create the model
const MovieDropdownSelection = mongoose.model('MovieDropdownSelection', movieDropdownSelectionSchema);

module.exports = MovieDropdownSelection;
