import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HabitProvider } from './context/HabitContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import HabitList from './components/HabitList';
import HabitDetail from './components/HabitDetail';
import Analytics from './components/Analytics';
import ChallengePage from './components/ChallengePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <HabitProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/habits" element={<HabitList />} />
                    <Route path="/habits/:id" element={<HabitDetail />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/challenges" element={<ChallengePage />} />
                    <Route path="*" element={<div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#666' }}>❌ Page not found</div>} />
                  </Routes>
                </Layout>
              </HabitProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;

