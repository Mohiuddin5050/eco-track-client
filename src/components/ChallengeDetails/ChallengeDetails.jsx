// import React, { useEffect } from "react";
// import { useParams } from "react-router";

// const ChallengeDetails = () => {
//   const { id } = useParams();

//   useEffect(()=>{
//     const fetchData = async () => {
//     // console.log(_id);
//     try {
//       await fetch(`http://localhost:3000/challenges/${id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchData()
//   },[id])
//   console.log(id);
//   return <div></div>;
// };

// export default ChallengeDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const ChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [currentParticipants, setCurrentParticipants] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/challenges/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch challenge details");
        }
        const data = await response.json();
        setChallenge(data);
        const demo = { data };
        // console.log(demo.data);
        setCurrentParticipants(data.participants || 0);
      } catch (error) {
        // console.error("Error fetching challenge:", error);
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
      // Here you would typically make an API call to join the challenge
    } else {
      setCurrentParticipants(currentParticipants - 1);
      setIsJoined(false);
      // Here you would typically make an API call to leave the challenge
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      setLoading(true);
      await fetch(`http://localhost:3000/challenges/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      // if (!response.ok) {
      //   throw new Error("Failed to delete challenge");
      // }

      // const result = await response.json();
      // console.log(result.message); // ✅ "Challenge deleted successfully"

      // if (result.success) {
      //   // remove from UI
      //   setChallenges((prev) =>
      //     prev.filter((challenge) => challenge._id !== id)
      //   );
      //   toast.success(result.message);
      // } else {
      //   toast.error(result.message);
      // }
    } catch (error) {
      // console.error("Error deleting challenge:", error);
      toast.error("Something went wrong while deleting");
    } finally {
      setLoading(false);
    }
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

  const getCategoryColor = (category) => {
    const colors = {
      "Energy Conservation": "bg-orange-100 text-orange-800 border-orange-200",
      "Waste Reduction": "bg-green-100 text-green-800 border-green-200",
      "Water Conservation": "bg-blue-100 text-blue-800 border-blue-200",
      "Sustainable Transport":
        "bg-purple-100 text-purple-800 border-purple-200",
      "Green Living": "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Energy Conservation": "⚡",
      "Waste Reduction": "♻️",
      "Water Conservation": "💧",
      "Sustainable Transport": "🚲",
      "Green Living": "🌿",
    };
    return icons[category] || "🌍";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-300 rounded-lg"></div>
                <div className="h-12 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Challenge not found"}
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't find the challenge you're looking for.
          </p>
          <button
            onClick={() => navigate("/challenges")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = calculateDaysRemaining();
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/challenges")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Challenges
        </button>

        {/* Challenge Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={challenge?.imageUrl}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-end">
              <div className="p-8 text-black">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                      challenge.category
                    )}`}
                  >
                    <span>{getCategoryIcon(challenge.category)}</span>
                    {challenge.category}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {challenge.duration} days
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{challenge.title}</h1>
                <p className="text-xl opacity-90">{challenge.target}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About this Challenge
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {challenge.description}
              </p>
            </div>

            {/* Progress & Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Challenge Progress
              </h2>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Challenge Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {daysRemaining}
                  </div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentParticipants}
                  </div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
              </div>

              {/* Dates */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">
                    Start Date:
                  </span>
                  <p className="text-gray-600">
                    {new Date(challenge.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">End Date:</span>
                  <p className="text-gray-600">
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Impact Measurement
              </h2>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Primary Metric
                  </h3>
                  <p className="text-green-700">{challenge.impactMetric}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {currentParticipants}
                </div>
                <div className="text-gray-600">People Joined</div>
              </div>

              <button
                onClick={handleJoinChallenge}
                className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  isJoined
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
                }`}
              >
                {isJoined ? (
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
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  handleDelete(id);
                }}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
                Delete Challenge
              </button>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Challenge Created By
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">
                    {challenge?.createdBy?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">EcoTrack Admin</p>
                  <p className="text-sm text-gray-600">{challenge.createdBy}</p>
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
