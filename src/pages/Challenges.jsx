import React, { useEffect, useState } from "react";
import ActiveChallengeCard from "../components/ActiveChallengeCard/ActiveChallengeCard";

const Challenges = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Energy Conservation",
    "Waste Reduction",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/challenges");
        const data = await res.json();
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Category filter
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    let filtered = [...data];

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Apply sort after filtering
    filtered = applySorting(filtered, sortOption);
    setFilteredData(filtered);
  };

  // Sort filter
  const handleSortChange = (option) => {
    setSortOption(option);
    let filtered = [...data];

    // Apply category first
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Apply sorting next
    filtered = applySorting(filtered, option);
    setFilteredData(filtered);
  };

  // Helper function for sorting
  const applySorting = (array, option) => {
    if (option === "Most Participants") {
      return array.sort((a, b) => b.participants - a.participants);
    } else if (option === "Least Participants") {
      return array.sort((a, b) => a.participants - b.participants);
    } else {
      return array; // Default (no sort)
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "Energy Conservation": "⚡",
      "Waste Reduction": "♻️",
      "Water Conservation": "💧",
      "Sustainable Transport": "🚲",
      "Green Living": "🌿",
      All: "🌍",
    };
    return icons[category] || "🌱";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Filters Skeleton */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg flex-1"></div>
            <div className="h-12 bg-gray-300 rounded-lg w-64"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🌱</span>
            </div>
            <span className="text-green-700 font-semibold">
              Join the Movement
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Eco Challenges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover meaningful environmental challenges and join thousands of
            eco-warriors making a real difference for our planet.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 mb-12 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {data.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Challenges
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {data.reduce(
                  (sum, challenge) => sum + challenge.participants,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Active Participants
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {filteredData.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Showing</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Category Filter - Horizontal Scroll for Mobile */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span>
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <span className="text-lg">{getCategoryIcon(category)}</span>
                    <span className="font-medium">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="lg:w-80">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/20 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔍</span>
                Sort Challenges
              </h3>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Default">Default Order</option>
                <option value="Most Participants">Most Popular First</option>
                <option value="Least Participants">Least Popular First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "All" || sortOption !== "Default") && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                  <span>{getCategoryIcon(selectedCategory)}</span>
                  Category: {selectedCategory}
                  <button
                    onClick={() => handleFilterChange("All")}
                    className="hover:text-green-900 ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {sortOption !== "Default" && (
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  <span>📈</span>
                  Sort: {sortOption}
                  <button
                    onClick={() => handleSortChange("Default")}
                    className="hover:text-blue-900 ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  handleFilterChange("All");
                  handleSortChange("Default");
                }}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Challenges Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((dt) => (
              <ActiveChallengeCard key={dt._id} dt={dt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No challenges found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any challenges matching your current filters. Try
              adjusting your criteria or browse all challenges.
            </p>
            <button
              onClick={() => {
                handleFilterChange("All");
                handleSortChange("Default");
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Show All Challenges
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
