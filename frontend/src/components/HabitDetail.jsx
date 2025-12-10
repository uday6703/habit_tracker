import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const HabitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const habitRes = await api.get(`/habits/${id}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setHabit(habitRes.data);

        const logsRes = await api.get(`/habitlogs/${id}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setLogs(logsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCheckIn = async () => {
    try {
      setCheckingIn(true);
      const today = new Date().toISOString().split('T')[0];
      await api.post('/habitlogs/checkin', 
        { habitId: id, date: new Date().toISOString() },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      // Refresh logs
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) return <div className="loading">⏳ Loading habit details...</div>;
  if (!habit) return <div className="loading">❌ Habit not found</div>;

  return (
    <div className="habit-detail">
      <button 
        onClick={() => navigate('/habits')}
        style={{
          background: '#f0f0f0',
          color: '#333',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '2rem',
          transition: 'all 0.3s ease'
        }}
      >
        ← Back to Habits
      </button>

      <h2>{habit.title}</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ color: '#1976d2', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>📂 Category</p>
          <p style={{ color: '#333', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{habit.category}</p>
        </div>
        <div style={{ background: '#f3e5f5', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ color: '#7b1fa2', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>📅 Frequency</p>
          <p style={{ color: '#333', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{habit.frequency}</p>
        </div>
        <div style={{ background: '#fff3e0', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ color: '#e65100', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>🎯 Priority</p>
          <p style={{ color: '#333', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{habit.priority}</p>
        </div>
        <div style={{ background: '#c8e6c9', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ color: '#2e7d32', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>🔥 Current Streak</p>
          <p style={{ color: '#333', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{habit.streak} days</p>
        </div>
      </div>

      <button
        onClick={handleCheckIn}
        disabled={checkingIn}
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: '#fff',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '1.1rem',
          width: '100%',
          marginBottom: '2rem',
          transition: 'all 0.3s ease',
          opacity: checkingIn ? 0.7 : 1
        }}
      >
        {checkingIn ? '⏳ Checking in...' : '✅ Check In Today'}
      </button>

      <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '1.3rem', color: '#333' }}>📊 History</h3>
      
      {logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: '#f5f7fa', borderRadius: '10px', color: '#666' }}>
          No check-ins yet. Start today! 🚀
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {logs.slice().reverse().map(log => (
            <div 
              key={log._id} 
              style={{
                padding: '1rem 1.5rem',
                background: log.completed ? '#e8f5e9' : '#ffebee',
                borderRadius: '10px',
                borderLeft: `4px solid ${log.completed ? '#4caf50' : '#ef5350'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#333' }}>
                {new Date(log.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              <span style={{ 
                fontWeight: '700', 
                color: log.completed ? '#4caf50' : '#ef5350',
                fontSize: '1rem'
              }}>
                {log.completed ? '✅ Done' : '❌ Missed'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitDetail;
