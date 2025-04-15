const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true, // Ensures username is unique
    required: true
  },
  email: {
    type: String,
    unique: true, // Ensures email is unique
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "PLAYER", // Default role is "player"
    enum: ["PLAYER", "ADMIN"] // Allowed values
  },
  createdAt: {
    type: Date,
    default: Date.now // Default timestamp for user creation
  }
}, { timestamps: true });

// // Hash password before saving
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model('User', UserSchema);