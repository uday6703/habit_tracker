# 🚀 Deploy Backend to Render - Complete Guide

## Overview
Render is a modern cloud platform that makes deploying Node.js applications simple and free (with limitations). This guide will walk you through deploying your Habit Tracker backend.

---

## Step 1: Prerequisites

Before you start, make sure you have:
- ✅ GitHub account (with your repo pushed)
- ✅ Render account (create at https://render.com)
- ✅ MongoDB Atlas account (or use existing)
- ✅ Backend code pushed to GitHub

---

## Step 2: Prepare Your Backend

### 2.1 Verify `package.json` has a start script

Check your `backend/package.json`:

```json
{
  "name": "habit-tracker-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.0.0"
  }
}
```

**Important:** The `start` script must be present (it should be).

### 2.2 Verify `server.js` uses environment variables

Check that your `backend/server.js` properly reads from `.env`:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
```

### 2.3 Create `.env.example` for reference

Already done! File exists at `backend/.env.example`

---

## Step 3: Create Render Account & Connect GitHub

### 3.1 Sign up for Render
1. Go to https://render.com
2. Click "Sign Up"
3. Choose "Sign up with GitHub" (recommended)
4. Authorize Render to access your GitHub

### 3.2 Connect Your Repository
1. After signing in, click "Dashboard" in the top right
2. Click "New +" button
3. Select "Web Service"
4. Click "Connect a repository"
5. Search for `habit_tracker` (or your repo name)
6. Click "Connect" next to the correct repository

---

## Step 4: Configure the Web Service

### 4.1 Basic Settings

After connecting the repository, you'll see a form:

| Field | Value |
|-------|-------|
| **Name** | `habit-tracker-backend` |
| **Environment** | `Node` |
| **Region** | `Oregon (us-west)` or closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### 4.2 Root Directory (IMPORTANT!)

- Click on "Root Directory" field
- Enter: `backend`
- This tells Render to look inside the backend folder

### 4.3 Instance Type

- Choose: **Free** (for testing)
- Or **Starter** ($7/month) for better performance

---

## Step 5: Set Environment Variables

### 5.1 On Render Dashboard

1. Scroll down to "Environment"
2. Click "Add Environment Variable"
3. Add each variable from your `.env` file:

**Variable 1: MONGO_URI**
```
Key:   MONGO_URI
Value: mongodb+srv://udaykiran:uday123@cluster0.7sg3e9l.mongodb.net/ExpressApp
```

**Variable 2: JWT_SECRET**
```
Key:   JWT_SECRET
Value: MySecureJWTSecret2025TaskManager!@#$%^&*()
```

**Variable 3: PORT (Optional)**
```
Key:   PORT
Value: 5000
```

### 5.2 Important Security Notes
- ⚠️ Never commit `.env` files to GitHub
- ✅ Always use Render's Environment Variables section
- 🔒 Consider rotating credentials after deployment
- 🗝️ Use MongoDB Atlas IP whitelist for security

---

## Step 6: Deploy

### 6.1 Create the Service

1. Scroll to the bottom of the form
2. Click "Create Web Service"
3. Render will now:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build the project
   - Start the server

### 6.2 Monitor the Deployment

1. You'll see a live log of the deployment
2. Look for messages like:
   ```
   Starting service...
   npm install completed
   Starting build...
   npm start
   Server running on port 5000
   ✅ MongoDB Connected
   ```

3. Once you see the service is "Live", deployment succeeded!

---

## Step 7: Get Your Render URL

### 7.1 Find Your Service URL

1. On the Render dashboard, go to your service
2. Look at the top of the page
3. You'll see a URL like: `https://habit-tracker-backend-xxx.onrender.com`
4. This is your public backend URL!

### 7.2 Test the Backend

Open your browser and visit:
```
https://habit-tracker-backend-xxx.onrender.com/api/auth/me
```

You should see an error like:
```json
{
  "message": "No token provided"
}
```

✅ This means the backend is working!

---

## Step 8: Update Frontend to Use Render Backend

### 8.1 Create `.env` in Frontend

Create `frontend/.env` (or update if exists):

```env
REACT_APP_API_URL=https://habit-tracker-backend-xxx.onrender.com
```

Replace `xxx` with your actual Render URL.

### 8.2 Update API Calls (if needed)

Check if your frontend uses this in `src/` files:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL
});
```

This should already be configured in your project.

---

## Step 9: Deploy Frontend

### Option A: Deploy to Render
1. Go back to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`

### Option B: Deploy to Vercel (Recommended for React)
1. Go to https://vercel.com
2. Click "Import Project"
3. Import your GitHub repository
4. Set root directory to `frontend`
5. Deploy!

### Option C: Deploy to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub
4. Select your repo
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. Deploy!

---

## Step 10: Verify Deployment

### 10.1 Test Backend
```bash
# Login endpoint
curl -X POST https://habit-tracker-backend-xxx.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"Demo@1234"}'

# Should return JWT token
```

### 10.2 Test Frontend
1. Visit your deployed frontend URL
2. Login with demo credentials
3. Create a habit
4. Verify everything works

---

## Troubleshooting

### Issue: "Server Error" on Render Dashboard

**Solution:**
1. Click on your service
2. Check the "Logs" tab
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - MongoDB connection error
   - Port not matching

### Issue: "MongoDB Connection Error"

**Solution:**
1. Check MONGO_URI in environment variables
2. Verify MongoDB Atlas IP whitelist:
   - Go to MongoDB Atlas
   - Click "Network Access"
   - Add Render IP or allow all (0.0.0.0/0)

### Issue: "npm start not found"

**Solution:**
1. Verify `package.json` has `"start": "node server.js"`
2. Make sure Root Directory is set to `backend`
3. Redeploy the service

### Issue: Frontend can't connect to backend

**Solution:**
1. Check `REACT_APP_API_URL` in frontend .env
2. Verify backend is running and responding
3. Check CORS settings in backend:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue: "Service Spun Down"

**Note:** Free tier Render services spin down after 15 minutes of inactivity.

**Solutions:**
- Upgrade to Paid plan
- Or keep service active by pinging it periodically

---

## Cost Comparison

| Platform | Cost | Notes |
|----------|------|-------|
| **Render (Free)** | Free | Spins down after 15 min, good for testing |
| **Render (Starter)** | $7/month | Always running, good for production |
| **Railway** | Pay-as-you-go | ~$5/month typical |
| **Heroku (Legacy)** | Paid only | ~$7-50/month |
| **AWS EC2** | ~$5/month | More complex setup |

---

## Post-Deployment

### Update Your Documentation

Update your deployment URLs in:
1. Frontend `.env` file
2. README.md
3. API documentation
4. Test credentials document

### Set Up Monitoring

1. Render has built-in monitoring
2. Check "Metrics" tab for:
   - CPU usage
   - Memory usage
   - Network traffic
   - Error rates

### Enable Auto-Deploy

On Render:
1. Go to your service settings
2. Enable "Auto-Deploy" for `main` branch
3. Now every GitHub push auto-deploys!

---

## Security Checklist

- [ ] ✅ Environment variables set on Render (not in code)
- [ ] ✅ MongoDB credentials are secure
- [ ] ✅ JWT_SECRET is strong
- [ ] ✅ CORS configured properly
- [ ] ✅ Frontend URL added to CORS allowlist
- [ ] ✅ No console logs exposing sensitive data
- [ ] ✅ Error messages don't leak stack traces
- [ ] ✅ Rate limiting implemented (optional)

---

## Useful Render Commands

### View Logs
```bash
# On Render dashboard → Logs tab
```

### Restart Service
```bash
# On Render dashboard → click "Restart"
```

### Manual Deploy
```bash
# Push to main branch on GitHub
# Render auto-deploys (if enabled)
```

---

## Quick Reference

| Step | What to Do |
|------|-----------|
| 1 | Sign up at render.com |
| 2 | Connect GitHub repository |
| 3 | Create Web Service |
| 4 | Set Root Directory to `backend` |
| 5 | Add environment variables |
| 6 | Click "Create Web Service" |
| 7 | Wait for deployment |
| 8 | Get Render URL |
| 9 | Update frontend .env |
| 10 | Deploy frontend |
| 11 | Test everything |

---

## Environment Variables Summary

```env
# Backend (.env on Render)
MONGO_URI=mongodb+srv://udaykiran:uday123@cluster0.7sg3e9l.mongodb.net/ExpressApp
JWT_SECRET=MySecureJWTSecret2025TaskManager!@#$%^&*()
PORT=5000

# Frontend (.env)
REACT_APP_API_URL=https://habit-tracker-backend-xxx.onrender.com
```

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel/Netlify
3. ✅ Test both working together
4. ✅ Share your live app link!

---

## Support Links

- **Render Docs:** https://render.com/docs
- **MongoDB Connection:** https://docs.mongodb.com/manual/reference/connection-string/
- **Node.js Deployment:** https://nodejs.org/en/docs/guides/nodejs-web-app/

---

**Congratulations! Your Habit Tracker is now live! 🎉**

**Live URL:** `https://habit-tracker-backend-xxx.onrender.com`

Your backend is now deployed and accessible worldwide!
