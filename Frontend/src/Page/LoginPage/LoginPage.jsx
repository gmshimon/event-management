import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Image & Welcome Text */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back 👋</h1>
        <p className="text-center text-lg mb-6 px-4">
          Manage and join exciting events with ease. Login to get started!
        </p>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-showing-login-page-in-website-or-application-illustration-download-svg-png-gif-file-formats--web-flat-modern-pack-seo-illustrations-1597938.png"
          alt="Event Illustration"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6">
        <form className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login to Your Account</h2>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer select-none"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-2 rounded-md"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register">
              <a  className="text-indigo-600 font-semibold hover:underline">
              Register Now
            </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
