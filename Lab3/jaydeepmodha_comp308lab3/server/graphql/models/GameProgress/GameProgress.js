const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true
  },
  level: {
    type: Number,
    required: true,
    default: 1 // Default level is 1
  },
  experiencePoints: {
    type: Number,
    required: true,
    default: 0 // Default experience points is 0
  },
  score: {
    type: Number,
    required: true,
    default: 0 // Default score is 0
  },
  rank: {
    type: Number,
    required: false, // Optional field
    default: 0
  },
  achievements: {
    type: [String],
    required: false,
    default: [] // Default is an empty array
  },
  progress: {
    type: String,
    required: false,
    default: "Not started" // Default progress description
  },
  lastPlayed: {
    type: Date,
    required: false,
    default: Date.now // Default to the current date
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('GameProgress', GameProgressSchema);