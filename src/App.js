import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import WorkoutPlan from './Pages/WorkoutPlan';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <div>
        <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><WorkoutPlan /></PrivateRoute>} />
      </Routes>
      </div>
  );
};

export default App;
