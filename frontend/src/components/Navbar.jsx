import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        🎯 Habit Tracker
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {user ? (
          <>
            <Link to="/dashboard">📊 Dashboard</Link>
            <Link to="/habits">✅ Habits</Link>
            <Link to="/analytics">📈 Analytics</Link>
            <Link to="/challenges">🏆 Challenges</Link>
            <button onClick={logout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">🔑 Login</Link>
            <Link to="/register">✍️ Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
