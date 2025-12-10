import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>✍️ Create Account</h2>
        <p style={{ textAlign: 'center', color: '#666', margin: '0 0 1rem 0' }}>
          Join Habit Tracker and start building better habits today
        </p>
        
        {error && <div className="error">❌ {error}</div>}
        
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setError('');
          }}
          required
          minLength={3}
        />
        
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setError('');
          }}
          required
        />
        
        <input
          type="password"
          placeholder="🔐 Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
          required
          minLength={6}
        />
        
        <input
          type="password"
          placeholder="🔐 Confirm Password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Creating account...' : '🚀 Create Account'}
        </button>

        <p style={{ textAlign: 'center', color: '#666', margin: '1rem 0 0 0', fontSize: '0.95rem' }}>
          Already have an account? <a href="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '700' }}>Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
