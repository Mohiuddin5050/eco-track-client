import React from "react";
import { Link } from "react-router";

const ActiveChallengeCard = ({ dt }) => {
  const {
    _id,
    title,
    category,
    description,
    duration,
    target,
    participants,
    impactMetric,
    startDate,
    endDate,
    imageUrl,
  } = dt;

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining();

  // Get category color
  const getCategoryColor = (cat) => {
    const colors = {
      "Energy Conservation": "bg-orange-100 text-orange-800 border-orange-200",
      "Waste Reduction": "bg-green-100 text-green-800 border-green-200",
      "Water Conservation": "bg-blue-100 text-blue-800 border-blue-200",
      "Sustainable Transport":
        "bg-purple-100 text-purple-800 border-purple-200",
      "Green Living": "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return colors[cat] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Get category icon
  const getCategoryIcon = (cat) => {
    const icons = {
      "Energy Conservation": "⚡",
      "Waste Reduction": "♻️",
      "Water Conservation": "💧",
      "Sustainable Transport": "🚲",
      "Green Living": "🌿",
    };
    return icons[cat] || "🌍";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
      {/* Challenge Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
              category
            )}`}
          >
            <span>{getCategoryIcon(category)}</span>
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-gray-700">
            {duration} days
          </span>
        </div>
      </div>

      {/* Challenge Content - This section will grow and push button to bottom */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Target */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Target:</p>
          <p className="text-gray-900 font-semibold line-clamp-2">{target}</p>
        </div>

        {/* Progress and Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {participants}
            </div>
            <div className="text-xs text-gray-500">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {impactMetric}
            </div>
            <div className="text-xs text-gray-500">Impact Metric</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Start: {new Date(startDate).toLocaleDateString()}</span>
            <span>End: {new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(
                  100 - (daysRemaining / duration) * 100,
                  10
                )}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Progress</span>
            <span>{daysRemaining} days left</span>
          </div>
        </div>

        {/* Action Button - This will always be at the bottom */}
        <div className="mt-auto">
          <Link
            to={`/challenges/${_id}`}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            See More
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActiveChallengeCard;
