import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../config/auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Register = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      await doCreateUserWithEmailAndPassword(email, password, fullName);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? (
                <EyeOffIcon className="h-6 w-6 text-gray-400" />
              ) : (
                <EyeIcon className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
              required
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-6 w-6 text-gray-400" />
              ) : (
                <EyeIcon className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
