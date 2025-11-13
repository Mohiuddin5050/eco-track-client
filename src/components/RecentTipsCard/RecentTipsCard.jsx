import React, { useState } from "react";

const RecentTipsCard = ({ dt }) => {
  const { title, content, category, authorName, upvotes, createdAt } = dt;

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);

  const handleUpvote = () => {
    if (isUpvoted) {
      setCurrentUpvotes(currentUpvotes - 1);
    } else {
      setCurrentUpvotes(currentUpvotes + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Get category color and icon
  const getCategoryStyle = (cat) => {
    const styles = {
      "Waste Management": {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "🗑️",
      },
      "Energy Saving": {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: "⚡",
      },
      "Water Conservation": {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "💧",
      },
      "Sustainable Living": {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "🌿",
      },
      "Green Transportation": {
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        icon: "🚲",
      },
    };
    return (
      styles[cat] || {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: "🌍",
      }
    );
  };

  const categoryStyle = getCategoryStyle(category);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${categoryStyle.color}`}
            >
              <span>{categoryStyle.icon}</span>
              {category}
            </span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(createdAt)}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-green-600">
                {authorName.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {authorName}
            </span>
          </div>
        </div>

        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isUpvoted
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isUpvoted ? "text-green-500 fill-current" : "text-gray-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold">{currentUpvotes}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
          Save Tip
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
          Try This
        </button>
      </div>
    </div>
  );
};

export default RecentTipsCard;
