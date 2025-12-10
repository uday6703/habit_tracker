# 📊 App Architecture & Flow Diagrams

## 1. Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│               APPLICATION FLOW                          │
└─────────────────────────────────────────────────────────┘

UNATHENTICATED USER
        ↓
   /register  ←→  /login
        ↓              ↓
  [Create]      [Demo Credentials]
  Account       Auto-fill Button
        ↓              ↓
        └──────┬───────┘
               ↓
    [Submit Login/Register]
               ↓
    [Backend Validates Credentials]
               ↓
    [JWT Token Generated]
               ↓
    [Token Stored in localStorage]
               ↓
    [AuthContext Updated]
               ↓
       AUTHENTICATED USER
               ↓
    [Redirect to Dashboard]
               ↓
   ┌──────────────────────────────────┐
   │  Main App Features:              │
   │  ├─ Dashboard                    │
   │  ├─ Habits List                  │
   │  ├─ Habit Detail                 │
   │  ├─ Analytics                    │
   │  └─ Challenges                   │
   └──────────────────────────────────┘
```

## 2. Route Protection

```
USER VISITS URL
      ↓
   ProtectedRoute Component
      ↓
   ┌──┴─────────────────────┐
   │                         │
   ↓                         ↓
Is User            Is User
Authenticated?     Still Loading?
   │                         │
┌──┴──┐                    ┌─┴──┐
│    │                     │   │
YES  NO                   NO   YES
│    │                     │   │
↓    ↓                     ↓   ↓
✅   ❌                    ✅   ⏳
Render  Redirect     Render  Show
Page    to /login    Page    "Loading"
```

## 3. Component Hierarchy

```
App.jsx
├── AuthProvider
│   └── Router
│       ├── Public Routes
│       │   ├── /login → Login.jsx
│       │   └── /register → Register.jsx
│       │
│       └── Protected Routes (ProtectedRoute wrapper)
│           └── Layout.jsx
│               ├── Navbar.jsx
│               └── HabitProvider
│                   ├── Dashboard.jsx
│                   ├── HabitList.jsx
│                   ├── HabitDetail.jsx
│                   ├── Analytics.jsx
│                   └── ChallengePage.jsx
```

## 4. Data Flow

```
┌─────────────────────────────────┐
│      React Components           │
└─────────────────────────────────┘
             │
             ↓ (useContext)
┌─────────────────────────────────┐
│    AuthContext / HabitContext   │
│  ├─ User state                  │
│  ├─ Habits state                │
│  └─ Actions (login, logout...)  │
└─────────────────────────────────┘
             │
             ↓ (axios)
┌─────────────────────────────────┐
│     API Calls (http://5000)     │
│  ├─ /api/auth/*                 │
│  ├─ /api/habits/*               │
│  ├─ /api/habit-logs/*           │
│  ├─ /api/analytics/*            │
│  └─ /api/challenges/*           │
└─────────────────────────────────┘
             │
             ↓ (Express middleware)
┌─────────────────────────────────┐
│        Node.js Backend          │
│  ├─ Routes                      │
│  ├─ Controllers                 │
│  ├─ Middleware (JWT Auth)       │
│  └─ Error Handler               │
└─────────────────────────────────┘
             │
             ↓ (Mongoose)
┌─────────────────────────────────┐
│       MongoDB Database          │
│  ├─ User collection             │
│  ├─ Habit collection            │
│  ├─ HabitLog collection         │
│  └─ Challenge collection        │
└─────────────────────────────────┘
```

## 5. Login Page Components

```
Login.jsx
├── Title & Subtitle
│   └── "📝 Habit Tracker"
│
├── Demo Credentials Card
│   ├── Badge "✨ Demo Account"
│   ├── Email: demo@example.com
│   ├── Password: Demo@1234
│   └── Auto-fill Button
│
├── Form Inputs
│   ├── Email input
│   └── Password input
│
├── Error Message (if any)
│
├── Sign In Button
│
└── Footer Links
    └── "Sign up" link
```

## 6. Database Schema Relationships

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ _id (ObjectId)      │
│ username (String)   │
│ email (String)      │
│ password (Hashed)   │
│ role (String)       │
│ friends ([User])    │
│ timestamps          │
└──────────┬──────────┘
           │
           │ owns
           ↓
┌─────────────────────┐        ┌──────────────────┐
│      Habit          │◄───────│   HabitLog       │
├─────────────────────┤        ├──────────────────┤
│ _id (ObjectId)      │        │ _id (ObjectId)   │
│ name (String)       │        │ habit (Ref)      │
│ description         │        │ user (Ref)       │
│ category (String)   │        │ date (Date)      │
│ frequency (String)  │        │ completed (Bool) │
│ goalDays (Number)   │        │ notes (String)   │
│ streak (Number)     │        │ timestamps       │
│ completed (Number)  │        └──────────────────┘
│ owner (Ref: User)   │
│ timestamps          │
└─────────────────────┘

┌─────────────────────┐
│    Challenge        │
├─────────────────────┤
│ _id (ObjectId)      │
│ name (String)       │
│ description         │
│ goalDays (Number)   │
│ participants ([Ref])│
│ creator (Ref: User) │
│ endDate (Date)      │
│ timestamps          │
└─────────────────────┘
```

## 7. Authentication Token Flow

```
FRONTEND                          BACKEND
─────────────────────────────────────────────────────────

User clicks "Sign In"
    │
    ├─→ POST /api/auth/login
    │   {email, password}
    │
    │                    ← Server receives request
    │
    │                    ← Check MongoDB for user
    │
    │                    ← Validate password with bcryptjs
    │
    │                    ← Generate JWT token
    │                      (expires in 7 days)
    │
    │   ← {token, user}
    │
    └─→ Store token in localStorage
    │
    └─→ Update AuthContext with user data
    │
    └─→ Navigate to /dashboard

SUBSEQUENT REQUESTS
────────────────────────────────────────────────────────

Browser requests protected resource
    │
    ├─→ GET /api/habits
    │   Headers: {Authorization: "Bearer <token>"}
    │
    │                    ← Server receives request
    │
    │                    ← Extract token from header
    │
    │                    ← Verify token signature
    │
    │                    ← Decode token to get user ID
    │
    │   ← Return user's habits
    │
    └─→ Update UI with response

TOKEN EXPIRATION
─────────────────────────────────────────────────────────

After 7 days:
    Token expires
    │
    └─→ API returns 401 Unauthorized
        │
        └─→ Frontend clears localStorage
            │
            └─→ Redirect to /login
```

## 8. Habit Tracking Workflow

```
CREATE HABIT
─────────────
User fills form
    │
    ├─ Name (required)
    ├─ Description (optional)
    ├─ Category (optional)
    ├─ Frequency (daily/weekly)
    └─ Goal Days (target)
    │
    └─→ POST /api/habits
        │
        └─→ Stored in MongoDB
            │
            └─→ User sees new habit in list

LOG HABIT
─────────
User clicks habit
    │
    └─→ Views HabitDetail page
        │
        └─→ Clicks "✅ Mark Complete Today"
            │
            ├─→ POST /api/habit-logs
            │   {habit, date, completed}
            │
            └─→ Shows success message
                │
                └─→ Updates Dashboard stats

VIEW PROGRESS
──────────────
User clicks Analytics
    │
    └─→ GET /api/analytics/stats
        │
        └─→ Calculates:
        │   ├─ Total habits
        │   ├─ Completion rate (%)
        │   ├─ Current streaks
        │   └─ Weekly/monthly charts
        │
        └─→ Renders Chart.js visualization
```

## 9. File Organization

```
Habit_tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Habit.js
│   │   ├── HabitLog.js
│   │   └── Challenge.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── habitController.js
│   │   ├── habitLogController.js
│   │   ├── analyticsController.js
│   │   └── challengeController.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── habit.js
│   │   ├── habitLog.js
│   │   ├── analytics.js
│   │   └── challenge.js
│   │
│   ├── middleware/
│   │   ├── auth.js (JWT validation)
│   │   ├── errorHandler.js
│   │   └── validate.js
│   │
│   ├── jobs/
│   │   └── streakUpdater.js (cron job)
│   │
│   ├── scripts/
│   │   └── seedDemo.js (create demo user)
│   │
│   ├── .env
│   ├── server.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HabitList.jsx
│   │   │   ├── HabitDetail.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── ChallengePage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── HabitContext.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── main.css
│   │   │
│   │   ├── App.jsx
│   │   └── index.jsx
│   │
│   └── package.json
│
├── README.md
├── QUICKSTART.md
└── IMPLEMENTATION_SUMMARY.md
```

## 10. State Management

```
AuthContext (Login/Auth State)
├─ user: {_id, username, email, role}
├─ token: JWT string
├─ loading: boolean
├─ error: string
├─ Functions:
│  ├─ login(email, password)
│  ├─ register(username, email, password)
│  ├─ logout()
│  └─ getMe() [fetch current user]
└─ localStorage: stores JWT token

HabitContext (Habit Data State)
├─ habits: [{id, name, streak, ...}]
├─ selectedHabit: {id, name, ...}
├─ loading: boolean
├─ error: string
├─ Functions:
│  ├─ getHabits()
│  ├─ createHabit(data)
│  ├─ updateHabit(id, data)
│  ├─ deleteHabit(id)
│  ├─ getHabitDetail(id)
│  ├─ logHabit(habitId)
│  └─ getAnalytics()
└─ Data: from API /api/habits
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Secure authentication flow
- ✅ Efficient data management
- ✅ Protected routes and APIs
- ✅ Responsive UI updates
- ✅ Error handling throughout
