const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    genre: {
        type: String,
        default: '',
        trim: true,
        required: 'Genre cannot be blank'
    },
    platform: {
        type: String,
        default: '',
        trim: true,
        required: 'Platform cannot be blank'
    },
    releaseYear: {
        type: Number,
        default: -1,
        required: 'Release year cannot be blank'
    },
    developer: {
        type: String,
        default: '',
        trim: true,
        required: 'Developer cannot be blank'
    },
    rating: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: '',
        trim: true
    }
});
mongoose.model('Game', GameSchema);
