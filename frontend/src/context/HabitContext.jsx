import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get('/habits', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => setHabits(res.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <HabitContext.Provider value={{ habits, setHabits, loading }}>
      {children}
    </HabitContext.Provider>
  );
};
