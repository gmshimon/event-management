import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CallToActionStrip = () => {
    const { user } = useSelector((state) => state.user);
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-10 w-32 h-32 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 right-10 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 left-8 opacity-10">
          <svg className="w-16 h-16 text-white animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="absolute top-16 right-16 opacity-10">
          <svg className="w-12 h-12 text-white animate-float animation-delay-1000" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-1/4 opacity-10">
          <svg className="w-14 h-14 text-white animate-float animation-delay-2000" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Create Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              First Event?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of event creators who trust EventHub to bring their ideas to life. 
            Start building meaningful connections in your community today.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-white">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-green-300 mb-2">Free</div>
              <div className="text-sm opacity-90">Event Creation</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-300 mb-2">5min</div>
              <div className="text-sm opacity-90">Setup Time</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {user?.email ? (
              <>
                <Link 
                  to="/add-event" 
                  className="btn btn-lg bg-white text-purple-600 hover:bg-gray-100 border-none transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event Now
                </Link>
                
                <Link 
                  to="/my-events" 
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 px-8 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  My Events
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-lg bg-white text-purple-600 hover:bg-gray-100 border-none transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Start
                </Link>
                
                <Link 
                  to="/add-event" 
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 px-8 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Event
                </Link>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white opacity-80">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm">Secure & Trusted</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm">5-Star Rated</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionStrip;