import React, { useContext, useState } from 'react';
import { HabitContext } from '../context/HabitContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const HabitList = () => {
  const { habits, setHabits, loading } = useContext(HabitContext);
  const [newHabit, setNewHabit] = useState({ title: '', category: 'Health', frequency: 'daily', priority: 'medium' });
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.title.trim()) return;
    
    try {
      setCreating(true);
      const res = await api.post('/habits', newHabit);
      setHabits([...habits, res.data]);
      setNewHabit({ title: '', category: 'Health', frequency: 'daily', priority: 'medium' });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('❌ Error creating habit');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(habitId);
      await api.delete(`/habits/${habitId}`);
      setHabits(habits.filter(h => h._id !== habitId));
      alert('✅ Habit deleted successfully');
    } catch (err) {
      console.error(err);
      alert('❌ Error deleting habit');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="loading">⏳ Loading your habits...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#333', fontWeight: '700', margin: 0 }}>✅ Your Habits</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            padding: '0.8rem 1.8rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
        >
          + {showForm ? 'Cancel' : 'New Habit'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateHabit} style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <input
            type="text"
            placeholder="Habit name (e.g., Morning Yoga)"
            value={newHabit.title}
            onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
            required
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <select
            value={newHabit.category}
            onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="Health">🏃 Health</option>
            <option value="Learning">📚 Learning</option>
            <option value="Productivity">⚙️ Productivity</option>
            <option value="Fitness">💪 Fitness</option>
            <option value="Mindfulness">🧘 Mindfulness</option>
            <option value="Other">⭐ Other</option>
          </select>
          <select
            value={newHabit.frequency}
            onChange={(e) => setNewHabit({...newHabit, frequency: e.target.value})}
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="daily">📅 Daily</option>
            <option value="weekly">📆 Weekly</option>
            <option value="monthly">📋 Monthly</option>
          </select>
          <select
            value={newHabit.priority}
            onChange={(e) => setNewHabit({...newHabit, priority: e.target.value})}
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <button
            type="submit"
            disabled={creating}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.9rem 2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              opacity: creating ? 0.7 : 1
            }}
          >
            {creating ? '⏳ Creating...' : '✨ Create Habit'}
          </button>
        </form>
      )}

      <div className="habit-list">
        {habits.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            background: '#fff',
            borderRadius: '16px',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem' }}>No habits yet. Create one to get started! 🚀</p>
          </div>
        ) : (
          habits.map(habit => (
            <div key={habit._id} className="habit-card" style={{ position: 'relative' }}>
              <button
                className="delete-icon-btn"
                onClick={() => handleDeleteHabit(habit._id)}
                disabled={deleting === habit._id}
                title="Delete habit"
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                🗑️
              </button>
              <h3>{habit.title}</h3>
              <p>📂 <strong>Category:</strong> {habit.category}</p>
              <p>📅 <strong>Frequency:</strong> {habit.frequency}</p>
              <p>🎯 <strong>Priority:</strong> {habit.priority}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f5576c', marginTop: '1rem' }}>
                🔥 Streak: {habit.streak} days
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Link to={`/habits/${habit._id}`} style={{ flex: 1 }}>View Details →</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitList;
