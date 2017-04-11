var mongoose = require('mongoose')

// setting up schema
var movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name cannot be empty'],
    minlength: [3, 'Movie name too short']
  },
  synopsis: String,
  rating: Number
})

// setting up models
var Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
