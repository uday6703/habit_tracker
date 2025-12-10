import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const demoCredentials = {
    email: 'demo@example.com',
    password: 'Demo@1234'
  };

  const autoFillDemo = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: '450px', width: '100%' }}>
        <h2>🔑 Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#666', margin: '0 0 1.5rem 0' }}>
          Sign in to your Habit Tracker account
        </p>
        
        
        {error && <div className="error">❌ {error}</div>}
        
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
        />
        
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Signing in...' : '✨ Sign In'}
        </button>

        <p style={{ textAlign: 'center', color: '#666', margin: '1rem 0 0 0', fontSize: '0.95rem' }}>
          Don't have an account? <a href="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '700' }}>Sign up</a>
        </p>
        {/* Demo Credentials Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem', marginRight: '0.5rem' }}>✨</span>
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>Demo Account</span>
          </div>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', opacity: 0.95 }}>
            Try the app with our demo credentials:
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span>📧 Email: </span>
              <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                {demoCredentials.email}
              </code>
            </div>
            <div>
              <span>🔑 Password: </span>
              <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                {demoCredentials.password}
              </code>
            </div>
          </div>
          <button 
            type="button"
            onClick={autoFillDemo}
            style={{
              width: '100%',
              padding: '0.6rem',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              hover: { background: 'rgba(255,255,255,0.3)' }
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ⚡ Auto-fill Demo Credentials
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
