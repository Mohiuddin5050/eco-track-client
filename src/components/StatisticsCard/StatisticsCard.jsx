import React from "react";

const StatisticsCard = ({ dt }) => {
  const { title, value, unit, description, updatedAt } = dt;

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get appropriate icon based on title
  const getIcon = (statTitle) => {
    switch (statTitle.toLowerCase()) {
      case "co2 saved":
        return "🌱";
      case "plastic reduced":
        return "♻️";
      case "water saved":
        return "💧";
      case "energy conserved":
        return "⚡";
      default:
        return "🌍";
    }
  };

  // Get gradient background based on statistic type
  const getGradient = (statTitle) => {
    switch (statTitle.toLowerCase()) {
      case "co2 saved":
        return "from-green-100 to-emerald-100 border-l-4 border-l-green-500";
      case "plastic reduced":
        return "from-blue-100 to-cyan-100 border-l-4 border-l-blue-500";
      case "water saved":
        return "from-cyan-100 to-sky-100 border-l-4 border-l-cyan-500";
      case "energy conserved":
        return "from-amber-100 to-orange-100 border-l-4 border-l-amber-500";
      default:
        return "from-gray-100 to-slate-100 border-l-4 border-l-gray-500";
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${getGradient(
        title
      )} rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{getIcon(title)}</span>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>

          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatNumber(value)}
            </span>
            <span className="text-sm text-gray-600 ml-2">{unit}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last updated</span>
            <span>{new Date(updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Progress indicator dot */}
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Progress bar for visual impact */}
      <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min((value / 50000) * 100, 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatisticsCard;
