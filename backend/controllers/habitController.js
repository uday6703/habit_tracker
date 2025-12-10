const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

exports.createHabit = async (req, res) => {
  const habit = await Habit.create({ ...req.body, user: req.user._id });
  res.status(201).json(habit);
};

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

exports.getHabit = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
  if (!habit) return res.status(404).json({ message: 'Habit not found' });
  res.json(habit);
};

exports.updateHabit = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body, { new: true }
  );
  if (!habit) return res.status(404).json({ message: 'Habit not found' });
  res.json(habit);
};

exports.deleteHabit = async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  await HabitLog.deleteMany({ habit: req.params.id });
  res.json({ message: 'Habit deleted' });
};
