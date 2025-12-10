# 🎯 Habit Tracker - MERN Application

## ✨ Features

- 📝 **Track Daily Habits** - Create and monitor your daily habits with visual progress
- 📊 **Analytics Dashboard** - View detailed statistics and progress charts
- 🏆 **Challenge System** - Complete challenges and earn badges
- 🔐 **Secure Authentication** - JWT-based authentication with bcryptjs password hashing
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

#### 1. Clone/Extract the Project
```bash
cd Habit_tracker
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file (should already exist with these values)
# PORT=5000
# MONGO_URI=mongodb+srv://udaykiran:uday123@cluster0.7sg3e9l.mongodb.net/ExpressApp
# JWT_SECRET=MySecureJWTSecret2025TaskManager!@#$%^&*()

# Start the server
npm start
# Server runs on http://localhost:5000
```

#### 3. Setup Frontend

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# App runs on http://localhost:3000
```

---

## 🔐 Authentication & Demo Credentials

### Demo Account (Pre-configured)

The application has a demo account ready to use:

**Email:** `demo@example.com`  
**Password:** `Demo@1234`

#### To Create the Demo Account:

Run the seed script from the backend directory:

```bash
cd backend
node scripts/seedDemo.js
```

This will create the demo user in MongoDB if it doesn't already exist.

#### On the Login Page:

1. You'll see a **"Demo Account"** section with purple gradient styling
2. Click the **"⚡ Auto-fill Demo Credentials"** button
3. Click **"✨ Sign In"** to login
4. You'll be redirected to the main dashboard

#### Create Your Own Account:

1. Click **"Sign up"** on the login page
2. Enter your details:
   - Username (unique)
   - Email (unique)
   - Password (min 6 characters)
3. Click **"Register"** and you'll be automatically logged in

---

## 📁 Project Structure

### Backend (`/backend`)
```
backend/
├── models/          # Mongoose schemas (User, Habit, HabitLog, Challenge)
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # JWT auth, error handling, validation
├── jobs/            # Cron jobs for streak calculations
├── config/          # Configuration files
├── scripts/         # Utility scripts (seedDemo.js)
├── .env             # Environment variables
└── server.js        # Express server entry point
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Auth/       # Login & Register
│   │   ├── Dashboard   # Main dashboard
│   │   └── ...other components
│   ├── context/        # React Context (Auth, Habits)
│   ├── styles/         # CSS styling
│   ├── App.jsx         # Main app with routing
│   └── index.jsx       # React entry point
└── package.json
```

---

## 🔄 Application Flow

### Authentication Flow
1. **Public Routes:**
   - `/login` - Login page with demo credentials
   - `/register` - Registration page

2. **Protected Routes:**
   - All other routes redirect to `/login` if not authenticated
   - ProtectedRoute component ensures authentication before rendering pages

3. **Routes:**
   - `/` or `/dashboard` - Main dashboard with habit overview
   - `/habits` - List and manage all habits
   - `/habits/:id` - Detailed view of a specific habit
   - `/analytics` - View statistics and progress charts
   - `/challenges` - View and join challenges

### Session Management
- JWT tokens expire in 7 days
- Tokens stored in localStorage (frontend)
- AuthContext manages global auth state
- Auto-logout on token expiration

---

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires auth)

### Habits
- `GET /api/habits` - Get all user habits
- `POST /api/habits` - Create new habit
- `GET /api/habits/:id` - Get specific habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Habit Logs
- `POST /api/habit-logs` - Log a habit completion
- `GET /api/habit-logs` - Get all logs
- `DELETE /api/habit-logs/:id` - Delete a log entry

### Analytics
- `GET /api/analytics/stats` - Get user statistics
- `GET /api/analytics/streak-history` - Get streak history

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges` - Create new challenge
- `POST /api/challenges/:id/join` - Join a challenge

---

## 🎨 Design Features

### Modern UI/UX
- **Color Scheme:** Purple and pink gradient (primary: #667eea, secondary: #764ba2)
- **Responsive Design:**
  - Mobile (0-480px)
  - Tablet (481-768px)
  - Desktop (769px+)
- **Components:**
  - Sticky navbar with emoji icons
  - Card-based layouts
  - Smooth hover animations
  - Color-coded habit status indicators
  - Real-time form validation

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- High contrast color scheme

---

## 🧪 Testing

### Test with Demo Account
1. Start both servers (backend on 5000, frontend on 3000)
2. Open http://localhost:3000 in your browser
3. You should be redirected to /login
4. Click "⚡ Auto-fill Demo Credentials"
5. Click "Sign In"
6. You should now be on the Dashboard

### Test Features
- **Create Habit:** Click "Add New Habit" on the dashboard
- **Log Habit:** Click habit name and then "✅ Mark Complete Today"
- **View Analytics:** Navigate to Analytics tab to see charts
- **Join Challenge:** Go to Challenges and click "Join Challenge"
- **View Stats:** Dashboard shows total habits, current streak, completion rate

---

## 📊 Database Schema

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcryptjs),
  role: String (enum: 'user', 'admin'),
  friends: [ObjectId],
  timestamps
}
```

### Habit
```javascript
{
  name: String,
  description: String,
  category: String,
  frequency: String (daily, weekly),
  goalDays: Number,
  streak: Number,
  completed: Number,
  owner: ObjectId (ref: User),
  timestamps
}
```

### HabitLog
```javascript
{
  habit: ObjectId (ref: Habit),
  user: ObjectId (ref: User),
  date: Date,
  completed: Boolean,
  notes: String,
  timestamps
}
```

### Challenge
```javascript
{
  name: String,
  description: String,
  goalDays: Number,
  participants: [ObjectId],
  creator: ObjectId (ref: User),
  endDate: Date,
  timestamps
}
```

---

## 🔧 Environment Variables

Create/Update `.env` file in the backend directory:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://udaykiran:uday123@cluster0.7sg3e9l.mongodb.net/ExpressApp

# JWT
JWT_SECRET=MySecureJWTSecret2025TaskManager!@#$%^&*()
```

---

## 📦 Dependencies

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **node-cron** - Scheduled jobs
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Chart.js** - Charts and graphs
- **react-chartjs-2** - React wrapper for Chart.js

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify .env file exists and has correct MONGO_URI
- Check MongoDB connection: `node test-connection.js`

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check if port 3000 is already in use

### Can't login with demo credentials
- Verify backend is running on http://localhost:5000
- Run `node scripts/seedDemo.js` to create demo user
- Check browser console for API errors

### MongoDB connection error
- Verify MONGO_URI in .env file
- Check if MongoDB Atlas cluster IP whitelist includes your IP
- Ensure MongoDB credentials are correct

---

## 📝 Notes

- This is a full-stack MERN application ready for deployment
- Authentication is session-based with JWT tokens
- All routes except login/register are protected
- Database uses MongoDB Atlas (cloud-hosted)
- Styling is done with modern CSS with gradients and animations

---

## 🚀 Deployment Ready

The application is production-ready with:
- ✅ Error handling and validation
- ✅ Secure password hashing
- ✅ JWT authentication
- ✅ Protected API routes
- ✅ Responsive design
- ✅ SEO-friendly structure

For deployment to Azure, AWS, Heroku, or other platforms, refer to their documentation for Node.js and React applications.

---

## 📞 Support

For issues or questions, check:
1. Browser console for errors
2. Backend terminal for server logs
3. MongoDB Atlas dashboard for database issues
4. .env file for configuration issues

---

**Happy Habit Tracking! 🎯**cd backend
cp .env.example .env
# Fill in your MongoDB URI and JWT secret
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## API Documentation

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user (JWT required)

### Habits
- `GET /api/habits` — List user habits
- `POST /api/habits` — Create habit
- `GET /api/habits/:id` — Get habit detail
- `PUT /api/habits/:id` — Update habit
- `DELETE /api/habits/:id` — Delete habit

### Habit Logs
- `POST /api/habitlogs/checkin` — Mark habit as done for a date
- `GET /api/habitlogs/:habitId` — Get logs for a habit

### Analytics
- `GET /api/analytics/stats` — Get analytics and insights

### Challenges
- `GET /api/challenges` — List challenges
- `POST /api/challenges` — Create challenge
- `POST /api/challenges/:id/join` — Join challenge

## Environment Variables

- **Backend**: See `.env.example`
- **Frontend**: See `.env.example`

## Deployment

### Backend (Render)
- Create a new Web Service on [Render](https://render.com/)
- Set environment variables from `.env.example`
- Set build command: `npm install`
- Set start command: `node server.js`

### Frontend (Vercel/Netlify)
- Import frontend folder to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
- Set environment variable `REACT_APP_API_URL` to your backend URL

### MongoDB Atlas
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Whitelist your IP
- Get connection string and set in backend `.env`

## License

MIT
