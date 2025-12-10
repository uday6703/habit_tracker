# 🧪 Testing Guide & User Manual

## Getting Started

### Prerequisites
- Node.js installed
- npm installed
- MongoDB Atlas account (already configured)
- Modern web browser

---

## Part 1: Starting the Application

### Step 1: Start Backend Server

```bash
cd backend
npm start
```

**Expected Output:**
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

**If you see errors:**
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Verify .env file has correct MONGO_URI
- Check internet connection for MongoDB Atlas

### Step 2: Start Frontend Server (New Terminal)

```bash
cd frontend
npm start
```

**Expected Output:**
```
webpack compiled successfully
✅ Compiled successfully!

You can now view the app in the browser.

  Local:            http://localhost:3000
```

**If you see errors:**
- Check if port 3000 is in use: `netstat -ano | findstr :3000`
- Try: `npm cache clean --force` then `npm install` again
- Delete node_modules and reinstall

---

## Part 2: Testing the Application

### Test 1: Login with Demo Credentials

**URL:** http://localhost:3000

**Expected Result:** Should redirect to login page automatically

**Steps:**
1. ✅ Page redirects to `/login`
2. ✅ Login form is displayed
3. ✅ "Demo Account" card is visible with purple background
4. ✅ Demo credentials visible:
   - Email: `demo@example.com`
   - Password: `Demo@1234`

### Test 2: Auto-fill Demo Credentials

**Steps:**
1. Click the **"⚡ Auto-fill Demo Credentials"** button
2. ✅ Email field should populate: `demo@example.com`
3. ✅ Password field should populate: `Demo@1234`
4. ✅ Any previous error message should clear

**Expected Result:** Fields auto-populated with demo credentials

### Test 3: Login Successfully

**Steps:**
1. Click "✨ Sign In" button
2. Wait for response (may take 1-2 seconds)
3. ✅ Should redirect to `/dashboard`
4. ✅ Dashboard should display with habit list

**Expected Result:** Successfully logged in to dashboard

**What to see:**
- Navbar at top with navigation links
- Welcome message or statistics
- Empty habits list (demo account has no habits yet)
- "Add New Habit" button or form

### Test 4: Create a New Habit

**Steps:**
1. On Dashboard or HabitList page
2. Click "Add New Habit" button/form
3. Fill in details:
   - **Name:** "Morning Exercise" (required)
   - **Description:** "30 minutes of exercise" (optional)
   - **Category:** "Health" (optional)
   - **Frequency:** "Daily" (required)
   - **Goal Days:** 30 (required)
4. Click "Create" button
5. ✅ Habit should appear in the list
6. ✅ Success message should display

**Expected Result:** Habit created and visible in list

### Test 5: Log Habit Completion

**Steps:**
1. Click on a habit from the list
2. Go to HabitDetail page
3. Click "✅ Mark Complete Today" button
4. ✅ Button should show success indication
5. ✅ Completion count should increase
6. ✅ Streak should update

**Expected Result:** Habit logged successfully, counter increases

**Optional:** Add notes to the completion
1. Before clicking mark complete, add notes in text field
2. Click "Mark Complete Today"
3. ✅ Notes should be saved with the log entry

### Test 6: View Analytics

**Steps:**
1. Click "Analytics" in navbar or navigation menu
2. ✅ Should load analytics page
3. ✅ See statistics:
   - Total habits created
   - Completion rate (%)
   - Current streaks
   - Overall progress
4. ✅ Should see charts/visualizations

**Expected Result:** Analytics page displays with charts and stats

### Test 7: View Challenges

**Steps:**
1. Click "Challenges" in navbar
2. ✅ Should see challenges list
3. ✅ Should see "Create Challenge" button
4. Click challenge to view details
5. ✅ Should see "Join Challenge" button
6. Click "Join Challenge"
7. ✅ Should see success message
8. ✅ Your name appears in participants list

**Expected Result:** Successfully joined a challenge

### Test 8: Test Logout

**Steps:**
1. Click on user profile/avatar in navbar
2. Click "Logout" button
3. ✅ Should redirect to `/login`
4. ✅ Try to access dashboard directly (http://localhost:3000/dashboard)
5. ✅ Should redirect back to `/login`

**Expected Result:** Logged out successfully, can't access protected routes

### Test 9: Register New Account

**Steps:**
1. On login page, click "Sign up" link
2. Fill registration form:
   - **Username:** "testuser123" (unique, required)
   - **Email:** "test@example.com" (unique, required)
   - **Password:** "Test@1234" (min 6 chars, required)
3. Click "Register" button
4. ✅ Should redirect to dashboard automatically
5. ✅ New account created in MongoDB

**Expected Result:** New account created and logged in

**Verify in MongoDB Atlas:**
1. Go to MongoDB Atlas dashboard
2. Navigate to Collections > ExpressApp > users
3. ✅ New user document should appear

### Test 10: Responsive Design Testing

**Mobile Testing (480px width):**
1. Open Chrome DevTools: `F12`
2. Click device toggle (mobile icon)
3. Select "iPhone X" or similar
4. ✅ Layout should be responsive
5. ✅ Navigation should be accessible
6. ✅ Forms should be readable
7. ✅ Buttons should be clickable

**Tablet Testing (768px width):**
1. Select "iPad" in device list
2. ✅ Layout should adapt
3. ✅ Two-column layout might appear
4. ✅ All features accessible

**Desktop Testing (1200px+):**
1. Return to full width
2. ✅ Full layout should display
3. ✅ All features visible and accessible

---

## Part 3: Testing Error Handling

### Test 11: Invalid Login Credentials

**Steps:**
1. Go to login page
2. Enter wrong email: `wrong@example.com`
3. Enter wrong password: `WrongPass123`
4. Click "Sign In"
5. ✅ Should see error message: "Invalid credentials"
6. ✅ Should NOT redirect to dashboard

**Expected Result:** Error displayed, not logged in

### Test 12: Missing Required Fields

**Steps:**
1. Go to login page
2. Leave email empty
3. Click "Sign In"
4. ✅ Browser shows: "Please fill out this field"
5. OR error message displays

**Expected Result:** Form validation prevents submission

### Test 13: Create Habit without Required Fields

**Steps:**
1. On HabitList page
2. Click "Add New Habit"
3. Leave "Name" empty
4. Click "Create"
5. ✅ Should see error: "Habit name is required"

**Expected Result:** Form validation prevents submission

### Test 14: Delete Habit

**Steps:**
1. Click on a habit to view detail
2. Click "Delete" button
3. Confirm deletion
4. ✅ Habit should disappear from list
5. ✅ Success message should display

**Expected Result:** Habit deleted successfully

---

## Part 4: Backend API Testing

### Using Postman or cURL

#### Test 15: Login via API

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "Demo@1234"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "username": "Demo User",
    "email": "demo@example.com",
    "role": "user"
  }
}
```

#### Test 16: Get User Profile (Protected)

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token-here>"
```

**Expected Response:**
```json
{
  "_id": "...",
  "username": "Demo User",
  "email": "demo@example.com",
  "role": "user"
}
```

#### Test 17: Get All Habits (Protected)

```bash
curl -X GET http://localhost:5000/api/habits \
  -H "Authorization: Bearer <your-token-here>"
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "Morning Exercise",
    "description": "30 minutes of exercise",
    "streak": 5,
    "completed": 10,
    "owner": "..."
  }
]
```

---

## Part 5: Performance Testing

### Test 18: Page Load Time

**Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page (Ctrl+R)
4. Check load time

**Expected Results:**
- Dashboard loads in < 2 seconds
- Initial page load < 3 seconds
- API responses < 1 second

### Test 19: Responsiveness Under Load

**Steps:**
1. Create multiple habits (10+)
2. ✅ List should still load quickly
3. ✅ No lag when scrolling
4. ✅ Interactions smooth

---

## Part 6: Security Testing

### Test 20: Protected Routes

**Steps:**
1. Logout from application
2. Try to access `/dashboard` directly in URL
3. ✅ Should redirect to `/login`
4. Try to access `/habits` directly
5. ✅ Should redirect to `/login`
6. Try to access `/analytics` directly
7. ✅ Should redirect to `/login`

**Expected Result:** All protected routes redirect to login

### Test 21: Invalid JWT Token

**Steps:**
1. Login successfully
2. Open browser DevTools
3. Go to Application/Storage > localStorage
4. Find token and manually edit it (add random characters)
5. Refresh page
6. ✅ Should redirect to `/login`

**Expected Result:** Invalid token detected, user logged out

### Test 22: Token Expiration (Optional)

**Note:** JWT tokens expire in 7 days

**To test manually:**
1. Edit `backend/server.js` JWT expiration to `'1s'` (1 second)
2. Restart backend
3. Login again
4. Wait 2 seconds
5. Try to perform action
6. ✅ Should redirect to `/login`

---

## Troubleshooting Guide

### Issue: "Cannot GET /"

**Solution:**
- Ensure frontend is running on port 3000
- Check if `npm start` command is running
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: MongoDB Connection Error

**Solution:**
```bash
# Check .env file
cat .env

# Verify connection
node test-connection.js

# Check MongoDB Atlas:
# 1. Go to MongoDB Atlas website
# 2. Check IP whitelist
# 3. Verify connection string
```

### Issue: Port Already in Use

**Solution:**
```bash
# Find process on port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or just restart computer
```

### Issue: npm packages not found

**Solution:**
```bash
# Backend
cd backend
rm -r node_modules
npm cache clean --force
npm install

# Frontend
cd frontend
rm -r node_modules
npm cache clean --force
npm install
```

### Issue: Login fails with "API request error"

**Solution:**
- Check backend is running: `http://localhost:5000/api/auth/me`
- Check browser console for error message
- Check backend console for error logs
- Verify MONGO_URI in .env

---

## Success Checklist ✅

After testing all features, you should be able to check:

- [ ] Login with demo credentials works
- [ ] Auto-fill button populates fields
- [ ] Dashboard loads after login
- [ ] Can create new habits
- [ ] Can log habit completions
- [ ] Analytics page displays charts
- [ ] Challenges page loads
- [ ] Can join challenges
- [ ] Logout works and redirects
- [ ] Can register new account
- [ ] Responsive design works on mobile
- [ ] Error messages display correctly
- [ ] Protected routes redirect to login
- [ ] All API endpoints respond correctly

---

## Final Notes

- **Demo Account:** Email: `demo@example.com` | Password: `Demo@1234`
- **Backend API:** http://localhost:5000
- **Frontend App:** http://localhost:3000
- **MongoDB:** MongoDB Atlas cloud database
- **Documentation:** See README.md for full details

---

**Happy Testing! 🎉**

If you encounter any issues, refer to:
1. README.md - Comprehensive documentation
2. IMPLEMENTATION_SUMMARY.md - What was implemented
3. ARCHITECTURE.md - System design
4. Browser console - JavaScript errors
5. Backend terminal - Server logs
