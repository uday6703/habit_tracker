const app = require('./app');
const PORT = process.env.PORT || 5000;
require('./jobs/streakUpdater');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
