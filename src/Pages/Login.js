import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../config/auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await doSignInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with Google');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
          >
            Log In
          </button>
        </form>
        <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
    >
      <img
        src="/GoogleLogo.png"
        alt="Google Logo"
        className="h-5 w-5 mr-2 object-cover"
      />
      <span className="text-base font-semibold">Sign in with Google</span>
    </button>
        <div className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
