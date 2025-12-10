require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedDemoUser = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('ℹ️ Demo user already exists');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create demo user
    const demoUser = new User({
      username: 'Demo User',
      email: 'demo@example.com',
      password: 'Demo@1234'
    });
    
    await demoUser.save();
    console.log('✅ Demo user created successfully!');
    console.log('📧 Email: demo@example.com');
    console.log('🔐 Password: Demo@1234');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo user:');
    console.error(error);
    process.exit(1);
  }
};

seedDemoUser();
