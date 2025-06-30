import React from "react";
import { useSelector } from "react-redux";

const EventCard = ({ event, onJoinEvent }) => {
  const { user } = useSelector((state) => state.user);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {event.category}
          </span>
        </div>
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-center shadow-lg">
            <div className="text-xs font-medium">
              {new Date(event.date)
                .toLocaleDateString("en-US", { month: "short" })
                .toUpperCase()}
            </div>
            <div className="text-lg font-bold leading-none">
              {new Date(event.date).getDate()}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.title}
        </h3>

        {/* Organizer */}
        <div className="flex items-center text-gray-600 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-800">
              by {event.organizer}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-3 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6"
              />
            </svg>
            <span className="text-sm font-medium">
              {formatDate(event.date)}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-3 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">
              {formatTime(event.time)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-3 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm line-clamp-1 font-medium">
              {event.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Attendees and Join Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <div className="flex -space-x-2 mr-3">
              {/* Mock attendee avatars */}
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-bold">A</span>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-bold">B</span>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-bold">C</span>
              </div>
              {event.attendeeCount > 3 && (
                <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">+</span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium">
              {event.attendeeCount}{" "}
              {event.attendeeCount === 1 ? "attendee" : "attendees"}
            </span>
          </div>
        </div>

        {/* Join Button */}
        <button
          disabled={event.attendees.includes(user?._id)}
          onClick={() => onJoinEvent(event)}
          className={`w-full py-3 px-4 rounded-xl font-semibold focus:outline-none focus:ring-4 flex items-center justify-center group/button transform transition-all duration-300
    ${
      event.attendees.includes(user?._id)
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-300 hover:scale-105 active:scale-95"
    }
  `}
        >
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/button:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {event.attendees.includes(user?._id)
            ? "Already Joined"
            : "Join Event"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
