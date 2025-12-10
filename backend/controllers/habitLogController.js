const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

const calculateStreak = async (habitId, userId) => {
  const logs = await HabitLog.find({ habit: habitId, user: userId, completed: true })
    .sort({ date: -1 });
  
  if (logs.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  
  for (const log of logs) {
    const logDate = new Date(log.date);
    logDate.setUTCHours(0, 0, 0, 0);
    
    const diffTime = currentDate - logDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
      currentDate = new Date(logDate);
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

exports.checkIn = async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = req.user._id;
    
    console.log('CheckIn Request:', { habitId, userId });
    
    // Validate habit exists and belongs to user
    const habit = await Habit.findOne({ _id: habitId, user: userId });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    
    // Get today's date range (00:00 to 23:59 UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if already checked in today
    const existingLog = await HabitLog.findOne({
      habit: habitId,
      user: userId,
      date: { $gte: today, $lt: tomorrow },
      completed: true
    });
    
    if (existingLog) {
      console.log('Already checked in today:', existingLog._id);
      return res.status(400).json({ message: 'Already checked in today!' });
    }
    
    // Create or update log for today
    const log = await HabitLog.findOneAndUpdate(
      {
        habit: habitId,
        user: userId,
        date: { $gte: today, $lt: tomorrow }
      },
      { completed: true, date: today },
      { upsert: true, new: true }
    );
    
    console.log('CheckIn Log Created:', log._id);
    
    // Calculate new streak
    const streak = await calculateStreak(habitId, userId);
    console.log('Calculated Streak:', streak);
    
    // Update habit with new streak
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      {
        streak: streak,
        longestStreak: Math.max(streak, habit.longestStreak || 0)
      },
      { new: true }
    );
    
    console.log('Habit Updated:', { streak: updatedHabit.streak, longestStreak: updatedHabit.longestStreak });
    
    res.json({ 
      log, 
      streak: updatedHabit.streak, 
      longestStreak: updatedHabit.longestStreak,
      message: 'Checked in successfully!' 
    });
  } catch (err) {
    console.error('CheckIn Error:', err);
    res.status(500).json({ message: 'Error checking in', error: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await HabitLog.find({ user: req.user._id, habit: req.params.habitId })
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error('GetLogs Error:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};
