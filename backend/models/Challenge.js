const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
  startDate: Date,
  endDate: Date,
  leaderboard: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Challenge', ChallengeSchema);
