const cron = require('node-cron');
const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

const updateStreaks = async () => {
  const habits = await Habit.find();
  for (const habit of habits) {
    // Check if habit was completed today
    const today = new Date();
    const log = await HabitLog.findOne({ habit: habit._id, date: today, completed: true });
    if (log) {
      habit.streak += 1;
      if (habit.streak > habit.longestStreak) habit.longestStreak = habit.streak;
    } else {
      habit.streak = 0;
    }
    await habit.save();
  }
};

cron.schedule('0 0 * * *', updateStreaks); // Runs every midnight

module.exports = updateStreaks;
