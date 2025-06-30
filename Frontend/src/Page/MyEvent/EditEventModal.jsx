import React, { useState, useEffect } from 'react';

const EditEventModal = ({ event, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    description: '',
    attendeeCount: 0
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        organizer: event.organizer || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        description: event.description || '',
        attendeeCount: event.attendeeCount || 0
      });
      setErrors({});
      setTouched({});
    }
  }, [event]);

  // Form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length < 3 ? 'Event title must be at least 3 characters' : '';
      case 'organizer':
        return value.trim().length < 2 ? 'Organizer name must be at least 2 characters' : '';
      case 'date':
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today ? 'Event date cannot be in the past' : '';
      case 'time':
        return !value ? 'Please select a time' : '';
      case 'location':
        return value.trim().length < 3 ? 'Location must be at least 3 characters' : '';
      case 'description':
        return value.trim().length < 10 ? 'Description must be at least 10 characters' : '';
      case 'attendeeCount':
        return value < 0 ? 'Attendee count cannot be negative' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'attendeeCount' ? parseInt(value) || 0 : value
    }));

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the event with new data
      const updatedEvent = {
        ...event,
        ...formData
      };
      
      onUpdate(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Event
            </h2>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-white hover:text-gray-200 transition-colors duration-200 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Title */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.title && touched.title
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
                placeholder="Enter your event title..."
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Organizer Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organizer Name *
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.organizer && touched.organizer
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
                placeholder="Your name or organization..."
              />
              {errors.organizer && touched.organizer && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.organizer}
                </p>
              )}
            </div>

            {/* Attendee Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Attendees
              </label>
              <input
                type="number"
                name="attendeeCount"
                value={formData.attendeeCount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                min="0"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.attendeeCount && touched.attendeeCount
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
                placeholder="0"
              />
              {errors.attendeeCount && touched.attendeeCount && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.attendeeCount}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.date && touched.date
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.date && touched.date && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.time && touched.time
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
              />
              {errors.time && touched.time && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.time}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.location && touched.location
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
                placeholder="Enter event location or venue..."
              />
              {errors.location && touched.location && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.location}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.description && touched.description
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
                }`}
                placeholder="Describe your event in detail. What can attendees expect? What should they bring? Any special requirements?"
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-8 rounded-xl font-semibold hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Event...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;