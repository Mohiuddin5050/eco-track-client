import React, { useEffect, useState } from "react";
import EventsTipsCard from "../EventsTipsCard/EventsTipsCard";

const EventsTips = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://eco-track-server-six.vercel.app/eventCollection"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
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
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Join community events and make a difference
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="h-24 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-full"></div>
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
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Join community events and make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((dt) => (
            <EventsTipsCard key={dt._id} dt={dt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsTips;
