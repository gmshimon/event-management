import React from 'react';
import HeroBanner from '../../Component/HeroBanner/HeroBanner';
import UpcomingEvents from '../../Component/UpcomingEvents/UpcomingEvents';
import HowItWorks from '../../Component/HowItWorks/HowItWorks';
import CallToActionStrip from '../../Component/CallToActionStrip/CallToActionStrip';

const Homepage = ({ isAuthenticated = false, events = [] }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Upcoming Events Section */}
      <UpcomingEvents events={events} />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Call to Action Section */}
      <CallToActionStrip isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Homepage;