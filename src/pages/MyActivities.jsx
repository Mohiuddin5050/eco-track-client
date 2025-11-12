import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/userChallenges/${user.email}`
        );
        const data = await res.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching user activities:", error);
        toast.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(id);
      const res = await fetch(`http://localhost:3000/userChallenges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        setActivities((prev) =>
          prev.map((act) =>
            act._id === id
              ? { ...act, status: data.status, progress: data.progress }
              : act
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Finished":
        return "bg-green-100 text-green-800 border-green-200";
      case "Ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Not Started":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Finished":
        return "✅";
      case "Ongoing":
        return "🔄";
      case "Not Started":
        return "⏳";
      default:
        return "📝";
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "Finished":
        return "bg-green-500";
      case "Ongoing":
        return "bg-blue-500";
      case "Not Started":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredActivities = activities.filter(
    (activity) => filter === "All" || activity.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🌱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Activities Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't joined any challenges yet. Start your sustainable
            journey by joining a challenge!
          </p>
          <button
            onClick={() => (window.location.href = "/challenges")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Challenges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Eco Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress and impact across all the environmental
            challenges you've joined
          </p>
        </div>

        {/* Stats Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {activities.length}
              </div>
              <div className="text-sm text-gray-500">Total Challenges</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {activities.filter((a) => a.status === "Ongoing").length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {activities.filter((a) => a.status === "Finished").length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {activities.filter((a) => a.status === "Not Started").length}
              </div>
              <div className="text-sm text-gray-500">Not Started</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Challenges
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Challenges</option>
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">In Progress</option>
            <option value="Finished">Completed</option>
          </select>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <div
              key={activity._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Challenge Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.challengeInfo.imageUrl}
                  alt={activity.challengeInfo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    <span>{getStatusIcon(activity.status)}</span>
                    {activity.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {activity.challengeInfo.duration} days
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {activity.challengeInfo.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {activity.challengeInfo.category}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {activity.challengeInfo.impactMetric}
                  </span>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Your Progress</span>
                    <span className="font-semibold">{activity.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                        activity.status
                      )}`}
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Update Status:
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={activity.status}
                      onChange={(e) =>
                        handleStatusChange(activity._id, e.target.value)
                      }
                      disabled={updating === activity._id}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Ongoing">In Progress</option>
                      <option value="Finished">Completed</option>
                    </select>
                    {updating === activity._id && (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Join Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Joined on {new Date(activity.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Filter State */}
        {filteredActivities.length === 0 && activities.length > 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {filter} Challenges
            </h3>
            <p className="text-gray-600 mb-4">
              You don't have any challenges with status "{filter}".
            </p>
            <button
              onClick={() => setFilter("All")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All Challenges
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;
