import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { habits } = useContext(HabitContext);

  const totalCompletionRate = habits.length > 0 
    ? Math.round((habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length / 7) * 100)
    : 0;

  return (
    <div className="dashboard">
      <h2>📊 Welcome to Your Habit Tracker!</h2>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>📅 Total Habits</h3>
          <p>{habits.length}</p>
        </div>
        
        <div className="card">
          <h3>🔥 Longest Streak</h3>
          <p>{Math.max(...habits.map(h => h.longestStreak || 0), 0)} days</p>
        </div>
        
        <div className="card">
          <h3>✨ Completion Rate</h3>
          <p>{totalCompletionRate}%</p>
        </div>

        <Link to="/analytics" className="card card-link">
          <h3>📈 View Analytics</h3>
        </Link>
      </div>

      {habits.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          marginTop: '2rem'
        }}>
          <h3 style={{ color: '#667eea', fontSize: '1.3rem', marginBottom: '1rem' }}>
            🚀 Get Started with Your First Habit!
          </h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Create a habit to begin tracking your progress and building better routines.
          </p>
          <Link to="/habits" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '0.9rem 2rem',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '700',
            transition: 'all 0.3s ease'
          }}>
            Create Habit →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
