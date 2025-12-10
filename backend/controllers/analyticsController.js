const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

exports.getStats = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  const logs = await HabitLog.find({ user: req.user._id });
  // Dummy analytics logic
  const stats = {
    totalHabits: habits.length,
    totalLogs: logs.length,
    streaks: habits.map(h => ({ title: h.title, streak: h.streak })),
    // Add more analytics as needed
  };
  res.json(stats);
};
