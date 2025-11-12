import React, { useState } from "react";

const EventsTipsCard = ({ dt }) => {
  const {
    title,
    description,
    date,
    location,
    organizer,
    maxParticipants,
    currentParticipants,
  } = dt;

  const [isRegistered, setIsRegistered] = useState(false);
  const [currentParticipantsCount, setCurrentParticipantsCount] =
    useState(currentParticipants);

  const handleRegister = () => {
    if (!isRegistered && currentParticipantsCount < maxParticipants) {
      setCurrentParticipantsCount(currentParticipantsCount + 1);
      setIsRegistered(true);
    } else if (isRegistered) {
      setCurrentParticipantsCount(currentParticipantsCount - 1);
      setIsRegistered(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" }),
      time: date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      fullDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const formattedDate = formatDate(date);

  // Calculate participation percentage
  const participationPercentage =
    (currentParticipantsCount / maxParticipants) * 100;

  // Check if event is upcoming
  const isUpcoming = new Date(date) > new Date();

  // Get status color
  const getStatusColor = () => {
    if (!isUpcoming) return "bg-gray-100 text-gray-600";
    if (currentParticipantsCount >= maxParticipants)
      return "bg-red-100 text-red-600";
    if (participationPercentage > 80) return "bg-orange-100 text-orange-600";
    return "bg-green-100 text-green-600";
  };

  const getStatusText = () => {
    if (!isUpcoming) return "Event Ended";
    if (currentParticipantsCount >= maxParticipants) return "Fully Booked";
    if (participationPercentage > 80) return "Almost Full";
    return "Available";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Date Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formattedDate.day}</div>
              <div className="text-sm uppercase tracking-wide">
                {formattedDate.month}
              </div>
            </div>
            <div className="border-l border-white/20 h-10"></div>
            <div>
              <div className="font-semibold text-lg">{title}</div>
              <div className="text-white/90 text-sm flex items-center gap-1 mt-1">
                <svg
                  className="w-4 h-4"
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
                {formattedDate.weekday}, {formattedDate.time}
              </div>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {getStatusText()}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <svg
            className="w-4 h-4 text-gray-500"
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
          <span className="text-sm">{location}</span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 text-gray-700 mb-6">
          <svg
            className="w-4 h-4 text-gray-500"
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
          <span className="text-sm">Organized by {organizer}</span>
        </div>

        {/* Participation Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Participants</span>
            <span>
              {currentParticipantsCount} / {maxParticipants}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${participationPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
          <button
            onClick={handleRegister}
            disabled={
              !isUpcoming ||
              (currentParticipantsCount >= maxParticipants && !isRegistered)
            }
            className={`flex-1 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2 ${
              isRegistered
                ? "bg-red-500 hover:bg-red-600 text-white"
                : currentParticipantsCount >= maxParticipants
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isRegistered ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Registered
              </>
            ) : currentParticipantsCount >= maxParticipants ? (
              "Fully Booked"
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Register Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsTipsCard;
