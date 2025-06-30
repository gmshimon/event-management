import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../../Component/EventCard/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock events data - in a real app, this would come from an API
  const mockEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "John Smith",
      date: "2024-02-15",
      time: "09:00",
      location: "San Francisco Convention Center, CA",
      description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders, hands-on workshops, and networking opportunities.",
      attendeeCount: 150,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
    },
    {
      id: 2,
      title: "Music Festival Summer",
      organizer: "Sarah Johnson",
      date: "2024-03-20",
      time: "18:00",
      location: "Hollywood Bowl, Los Angeles, CA",
      description: "Experience an unforgettable evening of live music featuring top artists from around the world. Food trucks and merchandise available.",
      attendeeCount: 500,
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      organizer: "Michael Chen",
      date: "2024-02-28",
      time: "19:00",
      location: "Rooftop Terrace, New York, NY",
      description: "Indulge in a curated selection of fine wines paired with gourmet dishes prepared by renowned chefs. Limited seating available.",
      attendeeCount: 80,
      category: "Food",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
    },
    {
      id: 4,
      title: "Startup Networking",
      organizer: "Emily Davis",
      date: "2024-03-05",
      time: "18:30",
      location: "Innovation Hub, Austin, TX",
      description: "Connect with fellow entrepreneurs, investors, and industry experts. Pitch your ideas and discover potential partnerships.",
      attendeeCount: 120,
      category: "Business",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400"
    },
    {
      id: 5,
      title: "Art Gallery Opening",
      organizer: "David Wilson",
      date: "2024-02-10",
      time: "17:00",
      location: "Modern Art Museum, Chicago, IL",
      description: "Celebrate the opening of our new contemporary art exhibition featuring works from emerging and established artists.",
      attendeeCount: 200,
      category: "Art",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 6,
      title: "Fitness Bootcamp",
      organizer: "Lisa Rodriguez",
      date: "2024-02-12",
      time: "07:00",
      location: "Central Park, New York, NY",
      description: "High-intensity outdoor workout session suitable for all fitness levels. Bring your own water bottle and towel.",
      attendeeCount: 45,
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
      id: 7,
      title: "Photography Workshop",
      organizer: "Alex Thompson",
      date: "2024-01-25",
      time: "10:00",
      location: "Downtown Studio, Seattle, WA",
      description: "Learn advanced photography techniques from professional photographers. Camera equipment will be provided for beginners.",
      attendeeCount: 25,
      category: "Education",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400"
    },
    {
      id: 8,
      title: "Book Club Meeting",
      organizer: "Rachel Green",
      date: "2024-01-30",
      time: "14:00",
      location: "Community Library, Portland, OR",
      description: "Monthly discussion of our current book selection. New members welcome! Light refreshments will be provided.",
      attendeeCount: 15,
      category: "Literature",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
    }
  ];

  // Initialize events and simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sort events by date and time in descending order (most recent first)
      const sortedEvents = [...mockEvents].sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeB - dateTimeA;
      });
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter events based on search term and date filter
  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const today = new Date();
    const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    
    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(currentWeekStart.getDate() - 7);
    const lastWeekEnd = new Date(currentWeekStart);
    lastWeekEnd.setDate(currentWeekStart.getDate() - 1);
    
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          const todayDate = new Date();
          return eventDate.toDateString() === todayDate.toDateString();
        });
        break;
      case 'currentWeek':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
        });
        break;
      case 'lastWeek':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= lastWeekStart && eventDate <= lastWeekEnd;
        });
        break;
      case 'currentMonth':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= currentMonthStart && eventDate <= currentMonthEnd;
        });
        break;
      case 'lastMonth':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= lastMonthStart && eventDate <= lastMonthEnd;
        });
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedFilter]);



  const handleJoinEvent = (eventId) => {
    // In a real app, this would make an API call
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, attendeeCount: event.attendeeCount + 1 }
          : event
      )
    );
    alert('Successfully joined the event!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore a world of exciting events happening around you. From tech conferences to music festivals, find your next adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events by title, organizer, location, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="lg:w-64">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-all duration-300 bg-white"
              >
                <option value="all">All Events</option>
                <option value="today">Today's Events</option>
                <option value="currentWeek">Current Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="currentMonth">Current Month</option>
                <option value="lastMonth">Last Month</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredEvents.length} of {events.length} events
              {searchTerm && ` for "${searchTerm}"`}
            </span>
            {selectedFilter !== 'all' && (
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSearchTerm('');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'No events are currently available.'}
            </p>
            <Link
              to="/add-event"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredEvents.map((event) => (
               <EventCard
                 key={event.id}
                 event={event}
                 onJoinEvent={handleJoinEvent}
               />
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default Events;