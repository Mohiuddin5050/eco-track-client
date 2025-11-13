import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../provider/AuthContext";

const ChallengeDetails = () => {
  useTitle("Challenge Details");
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [currentParticipants, setCurrentParticipants] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://eco-track-server-six.vercel.app/challenges/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch challenge details");
        }
        const data = await response.json();
        setChallenge(data);
        setCurrentParticipants(data.participants || 0);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setError("Failed to load challenge details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleJoinChallenge = () => {
    if (!isJoined) {
      setCurrentParticipants(currentParticipants + 1);
      setIsJoined(true);
      Swal.fire({
        title: "Challenge Joined!",
        text: "You've successfully joined this challenge",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      setCurrentParticipants(currentParticipants - 1);
      setIsJoined(false);
      Swal.fire({
        title: "Challenge Left",
        text: "You've left this challenge",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This challenge will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fff",
      color: "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://eco-track-server-six.vercel.app/challenges/${id}`,
            {
              method: "DELETE",
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Challenge has been successfully deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });

            setTimeout(() => {
              navigate("/challenges");
            }, 1500);
          } else {
            Swal.fire({
              title: "Failed!",
              text: data.message || "Failed to delete challenge.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting challenge:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const calculateDaysRemaining = () => {
    if (!challenge) return 0;
    const end = new Date(challenge.endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateProgress = () => {
    if (!challenge) return 0;
    const daysRemaining = calculateDaysRemaining();
    return Math.max(100 - (daysRemaining / challenge.duration) * 100, 0);
  };

  const getCategoryStyle = (category) => {
    const styles = {
      "Energy Conservation": {
        color: "from-orange-500 to-amber-600",
        bgColor: "bg-orange-50",
        icon: "⚡",
      },
      "Waste Reduction": {
        color: "from-green-500 to-emerald-600",
        bgColor: "bg-green-50",
        icon: "♻️",
      },
      "Water Conservation": {
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50",
        icon: "💧",
      },
      "Sustainable Transport": {
        color: "from-purple-500 to-violet-600",
        bgColor: "bg-purple-50",
        icon: "🚲",
      },
      "Green Living": {
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50",
        icon: "🌿",
      },
    };
    return (
      styles[category] || {
        color: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-50",
        icon: "🌍",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="space-y-6">
                <div className="h-40 bg-gray-300 rounded-2xl"></div>
                <div className="h-32 bg-gray-300 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {error || "Challenge Not Found"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We couldn't find the challenge you're looking for. It might have
            been removed or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/challenges")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Browse Challenges
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = calculateDaysRemaining();
  const progress = calculateProgress();
  const categoryStyle = getCategoryStyle(challenge.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/challenges")}
            className="group flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-white/20"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Back to Challenges</span>
          </button>

          {/* Challenge Status */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20">
            <div
              className={`w-3 h-3 rounded-full ${
                daysRemaining > 7
                  ? "bg-green-500"
                  : daysRemaining > 3
                  ? "bg-yellow-500"
                  : "bg-red-500"
              } animate-pulse`}
            ></div>
            <span className="text-sm font-medium text-gray-700">
              {daysRemaining > 0
                ? `${daysRemaining} days remaining`
                : "Challenge ended"}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-white/20">
          <div className="relative h-96">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30`}
                  >
                    <span className="text-lg">{categoryStyle.icon}</span>
                    {challenge.category}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {challenge.duration} days
                  </span>
                </div>
                <h1 className="text-5xl font-bold mb-3 leading-tight">
                  {challenge.title}
                </h1>
                <p className="text-xl opacity-90 max-w-2xl">
                  {challenge.target}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  About This Challenge
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {challenge.description}
              </p>
            </div>

            {/* Progress & Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Challenge Progress
              </h2>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
                  <span>Overall Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {daysRemaining}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Days Left
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {currentParticipants}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Participants
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {challenge.duration}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Total Days
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl border border-purple-200">
                  <div className="text-md font-bold text-purple-600 mb-2">
                    {challenge.impactMetric}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Impact Metric
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Challenge Timeline
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">
                      Start Date
                    </div>
                    <div className="text-gray-600">
                      {new Date(challenge.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300 mx-4 rounded-full">
                    <div
                      className="h-1 bg-green-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">End Date</div>
                    <div className="text-gray-600">
                      {new Date(challenge.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Environmental Impact
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🌱</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Primary Impact Measurement
                    </h3>
                    <p className="text-lg opacity-90">
                      {challenge.impactMetric}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Fixed Position */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Action Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ready to Make a Difference?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Join {currentParticipants} other eco-warriors
                  </p>
                </div>

                {/* Join Button */}
                <Link
                  to={user ? `/joinChallenges/${id}` : "/login"}
                  onClick={user ? handleJoinChallenge : undefined}
                  className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 mb-4 ${
                    user
                      ? isJoined
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105"
                  }`}
                >
                  {user ? (
                    isJoined ? (
                      <>
                        <svg
                          className="w-5 h-5"
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
                        Leave Challenge
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
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
                        Join Challenge
                      </>
                    )
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
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
                      Join Challenge
                    </>
                  )}
                </Link>

                {/* Delete Button */}
                <Link
                  to={user ? "#" : "/login"}
                  onClick={user ? () => handleDelete(id) : undefined}
                  className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 ${
                    user
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg transform hover:scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  {user ? "Delete Challenge" : "Delete Challenge"}
                </Link>
              </div>

              {/* Organizer Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>👤</span>
                  Challenge Creator
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {challenge?.createdBy?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      EcoTrack Admin
                    </p>
                    <p className="text-sm text-gray-600">
                      {challenge.createdBy}
                    </p>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      Verified Organizer
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Success Rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Avg. Impact</span>
                    <span className="font-semibold">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Difficulty</span>
                    <span className="font-semibold">Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
