const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habit'));
app.use('/api/habitlogs', require('./routes/habitLog'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/challenges', require('./routes/challenge'));

app.use(errorHandler);

module.exports = app;
