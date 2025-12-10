require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  mongoose.disconnect();
  console.log('✅ Disconnected');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});
