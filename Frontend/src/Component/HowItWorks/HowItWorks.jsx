import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Events",
      description: "Set up your event in minutes with our intuitive event creation tool. Add details, set pricing, and customize your event page.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      features: ["Easy setup", "Custom branding", "Flexible pricing"]
    },
    {
      id: 2,
      title: "Discover Events",
      description: "Browse through thousands of events in your area. Filter by category, date, location, and price to find exactly what you're looking for.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      features: ["Smart filters", "Location-based", "Personalized recommendations"]
    },
    {
      id: 3,
      title: "Join with One Click",
      description: "Found an interesting event? Join instantly with our streamlined registration process. Get tickets, connect with other attendees.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      features: ["Instant registration", "Secure payments", "Event reminders"]
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="60" height="60" viewBox="0 0 60 60" className="absolute top-10 left-10">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </svg>
          <svg width="60" height="60" viewBox="0 0 60 60" className="absolute top-32 right-20">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </svg>
          <svg width="60" height="60" viewBox="0 0 60 60" className="absolute bottom-20 left-1/4">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Getting started with EventHub is simple. Follow these three easy steps to start creating amazing events or discovering exciting experiences in your area.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              )}

              {/* Step Card */}
              <div className={`${step.bgColor} rounded-3xl p-8 h-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative z-10`}>
                {/* Step Number */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <span className="text-2xl font-bold">{step.id}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className={`flex items-center justify-center mb-6 text-gray-700`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of event organizers and attendees who trust EventHub for their event needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-gradient-to-r from-blue-500 to-purple-600 border-none text-white hover:from-blue-600 hover:to-purple-700 px-8">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Event
              </button>
              <button className="btn btn-lg btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 px-8">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;