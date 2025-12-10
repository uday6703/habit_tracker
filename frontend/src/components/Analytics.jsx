import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/stats', { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    })
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">⏳ Loading analytics...</div>;
  if (!stats) return <div className="loading">❌ No data available</div>;

  return (
    <div className="analytics">
      <h2>📊 Your Analytics & Insights</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)'
        }}>
          <p style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0', opacity: 0.9 }}>TOTAL HABITS</p>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>{stats.totalHabits}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(245, 87, 108, 0.2)'
        }}>
          <p style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0', opacity: 0.9 }}>TOTAL CHECK-INS</p>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>{stats.totalLogs}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(79, 172, 254, 0.2)'
        }}>
          <p style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0', opacity: 0.9 }}>COMPLETION RATE</p>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>
            {stats.totalHabits > 0 
              ? Math.round((stats.totalLogs / stats.totalHabits / 7) * 100) 
              : 0}%
          </p>
        </div>
      </div>

      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '1.5rem', fontSize: '1.3rem' }}>🔥 Streaks by Habit</h3>
        
        {stats.streaks.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            No streaks yet. Create a habit and check in to start building streaks! 🚀
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {stats.streaks.map((habit, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.2rem',
                background: '#f5f7fa',
                borderRadius: '10px',
                borderLeft: '4px solid #667eea'
              }}>
                <div>
                  <p style={{ color: '#333', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                    {habit.title}
                  </p>
                  <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
                    Current Streak
                  </p>
                </div>
                <div style={{
                  background: habit.streak > 7 
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : habit.streak > 0
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#ccc',
                  color: '#fff',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: '700',
                  fontSize: '1.1rem'
                }}>
                  🔥 {habit.streak} days
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        background: '#fff3cd',
        border: '2px solid #ffc107',
        color: '#856404',
        padding: '1.5rem',
        borderRadius: '10px',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ fontWeight: '700', margin: '0 0 0.5rem 0' }}>💡 Pro Tip</p>
        <p style={{ margin: 0 }}>
          Check in every day to build momentum! A streak of 21+ days typically forms a habit.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
