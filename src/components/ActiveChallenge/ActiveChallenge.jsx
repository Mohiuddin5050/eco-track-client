import React, { useEffect, useState } from "react";
import ActiveChallengeCard from "../ActiveChallengeCard/ActiveChallengeCard";
import { Link } from "react-router";
import useTitle from "../../hooks/useTitle";

const ActiveChallenge = () => {
  useTitle("ActiveChallenge")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://eco-track-server-six.vercel.app/activeChallenges"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch challenges");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setError("Failed to load challenges");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Active Challenges
            </h2>
            <p className="text-lg text-gray-600">
              Join our community in making a difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg mx-6 my-12">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Active Challenges
          </h2>
          <p className="text-lg text-gray-600">
            Join our community in making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((dt) => (
            <ActiveChallengeCard key={dt._id} dt={dt} /> // Fixed: using dt._id
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/Challenges"
            className="bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            View All Challenges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActiveChallenge;
