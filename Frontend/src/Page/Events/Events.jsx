import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../../Component/EventCard/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, resetEventState } from '../../Redux/Slice/EventSlice';
import { showToastMessage } from '../../Utils/toastMessage';


const Events = () => {
  const dispatch = useDispatch();
  const { events, isGetEventLoading, isGetEventError, error } = useSelector(state => state.event);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(()=>{
    if(!isGetEventError){
      showToastMessage(error,"error")
      dispatch(resetEventState())
    }
  },[dispatch, error, isGetEventError])

  // Debounce search for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      // API expects 'date' for today, 'range' for week/month, etc.
      if (selectedFilter === 'today') params.date = 'today';
      else if (['currentWeek', 'lastWeek', 'currentMonth', 'lastMonth'].includes(selectedFilter)) {
        params.range = selectedFilter;
      }
      dispatch(fetchEvents(params));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFilter, dispatch]);

  // Loading State
  if (isGetEventLoading) {
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
              Showing {events.length} event{events.length !== 1 && 's'}
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
        {events.length === 0 ? (
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
             {events.map((event) => (
               <EventCard
                 key={event._id || event.id}
                 event={event}
                 // Add your join event handler here, or use as needed
               />
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default Events;
