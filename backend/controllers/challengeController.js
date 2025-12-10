const Challenge = require('../models/Challenge');

exports.createChallenge = async (req, res) => {
  const challenge = await Challenge.create({ ...req.body, creator: req.user._id, participants: [req.user._id] });
  res.status(201).json(challenge);
};

exports.joinChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge.participants.includes(req.user._id)) {
    challenge.participants.push(req.user._id);
    await challenge.save();
  }
  res.json(challenge);
};

exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
};
