import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import WorkoutPlan from './Pages/WorkoutPlan';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><WorkoutPlan /></PrivateRoute>} />
      </Routes>
  );
};

export default App;
