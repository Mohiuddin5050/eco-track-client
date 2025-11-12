// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";

// const JoinChallenge = () => {
//   const [data, setData] = useState([]);
//   const { id } = useParams();
//   console.log(id);

//   const fetchData = async () => {
//     await fetch(`http://localhost:3000/challenges/${id}`, {
//       method: "PATCH",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//   };

//   return <div></div>;
// };

// export default JoinChallenge;

import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";

const JoinChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(null);
  const { user } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(challenge);

  // Fetch challenge details
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/challenges/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch challenge details");
        }
        const data = await response.json();
        setChallenge(data);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setError("Failed to load challenge details");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleJoinChallenge = async () => {
    try {
      setJoining(true);

      // Update participants count
      const updatedChallenge = {
        ...challenge,
        participants: challenge.participants + 1,
      };

      const response = await fetch(`http://localhost:3000/challenges/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedChallenge, email: user.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to join challenge");
      }

      const result = await response.json();
      setChallenge(updatedChallenge);
      console.log(result);
      setJoined(true);

      // Here you would also create a userChallenge record
      // await fetch('http://localhost:3000/userChallenges', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: 'current-user-id', // You would get this from auth
      //     challengeId: id,
      //     status: 'Ongoing',
      //     progress: 0,
      //     joinDate: new Date().toISOString()
      //   })
      // });
    } catch (error) {
      console.error("Error joining challenge:", error);
      setError("Failed to join challenge. Please try again.");
    } finally {
      setJoining(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading challenge details...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/challenges")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenge Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Challenge Image */}
              <div className="relative h-64">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                      challenge.category
                    )}`}
                  >
                    <span>{getCategoryIcon(challenge.category)}</span>
                    {challenge.category}
                  </span>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {challenge.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {challenge.duration}
                    </div>
                    <div className="text-sm text-gray-600">Days Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {challenge.participants}
                    </div>
                    <div className="text-sm text-gray-600">
                      Current Participants
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {daysRemaining}
                    </div>
                    <div className="text-sm text-gray-600">Days Remaining</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    About This Challenge
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Target & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Target Goal
                    </h3>
                    <p className="text-gray-700">{challenge.target}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Impact Measurement
                    </h3>
                    <p className="text-gray-700">{challenge.impactMetric}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Challenge Timeline
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      <div className="font-medium">Start Date</div>
                      <div>
                        {new Date(challenge.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Duration</div>
                      <div>{challenge.duration} days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">End Date</div>
                      <div>
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              {joined ? (
                /* Success State */
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
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
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Challenge Joined!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You're now part of this amazing initiative. Start tracking
                    your progress!
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/activities")}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      View My Activities
                    </button>
                    <button
                      onClick={() => navigate("/challenges")}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      Browse More Challenges
                    </button>
                  </div>
                </div>
              ) : (
                /* Join State */
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ready to Make a Difference?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join {challenge.participants} other eco-warriors in this
                    challenge
                  </p>

                  <button
                    onClick={handleJoinChallenge}
                    disabled={joining}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                  >
                    {joining ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Joining...
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
                        Click To Join
                      </>
                    )}
                  </button>

                  {/* Challenge Stats */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {challenge.duration} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Impact:</span>
                        <span className="font-medium">
                          {challenge.impactMetric}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Community:</span>
                        <span className="font-medium">
                          {challenge.participants} participants
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinChallenge;
