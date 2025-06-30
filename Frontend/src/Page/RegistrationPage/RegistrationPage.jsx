import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Image and Welcome Text */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Join the Community 🌟</h1>
        <p className="text-center text-lg mb-6 px-4">
          Create an account to host and join awesome events today.
        </p>
        <img
          src="https://icons.veryicon.com/png/o/brands/linear-icon-29/add-user-20.png"
          alt="Register Illustration"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* Right Side: Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6">
        <form className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Your Account</h2>

          {/* Name */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
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

          {/* Photo URL */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Photo URL</label>
            <input
              type="url"
              placeholder="Paste your photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-2 rounded-md"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login">
                <a className="text-indigo-600 font-semibold hover:underline">
              Sign In
            </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
