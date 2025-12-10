import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const ChallengePage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({ name: '', description: '' });

  useEffect(() => {
    api.get('/challenges', { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    })
      .then(res => setChallenges(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/challenges', newChallenge, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChallenges([...challenges, res.data]);
      setNewChallenge({ name: '', description: '' });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      const res = await api.post(`/challenges/${challengeId}/join`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChallenges(challenges.map(c => c._id === challengeId ? res.data : c));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading">⏳ Loading challenges...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#333', fontWeight: '700', margin: 0 }}>🏆 Challenges</h2>
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
          + {showForm ? 'Cancel' : 'Create Challenge'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateChallenge} style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          display: 'grid',
          gap: '1rem'
        }}>
          <input
            type="text"
            placeholder="Challenge name"
            value={newChallenge.name}
            onChange={(e) => setNewChallenge({...newChallenge, name: e.target.value})}
            required
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <textarea
            placeholder="Challenge description (optional)"
            value={newChallenge.description}
            onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
            style={{
              padding: '0.9rem',
              borderRadius: '10px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              fontFamily: 'inherit',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.9rem 2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            ✨ Create Challenge
          </button>
        </form>
      )}

      <div className="challenges" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', padding: 0 }}>
        {challenges.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            background: '#fff',
            borderRadius: '16px',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem' }}>No challenges yet. Create one to get started! 🚀</p>
          </div>
        ) : (
          challenges.map(challenge => (
            <div key={challenge._id} className="challenge-card">
              <h3>🏅 {challenge.name}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                {challenge.description || 'No description provided'}
              </p>
              <p>👥 <strong>Participants:</strong> {challenge.participants.length}</p>
              <button
                onClick={() => handleJoinChallenge(challenge._id)}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.7rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  transition: 'all 0.3s ease'
                }}
              >
                ✅ Join Challenge
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
