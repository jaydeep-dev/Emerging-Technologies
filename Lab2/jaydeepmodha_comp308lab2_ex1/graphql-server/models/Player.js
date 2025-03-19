const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ranking: { type: Number, required: true },
  tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
});

module.exports = mongoose.model('Player', PlayerSchema);