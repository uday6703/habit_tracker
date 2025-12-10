const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

exports.checkIn = async (req, res) => {
  const { habitId, date } = req.body;
  const log = await HabitLog.findOneAndUpdate(
    { habit: habitId, user: req.user._id, date },
    { completed: true },
    { upsert: true, new: true }
  );
  res.json(log);
};

exports.getLogs = async (req, res) => {
  const logs = await HabitLog.find({ user: req.user._id, habit: req.params.habitId });
  res.json(logs);
};
