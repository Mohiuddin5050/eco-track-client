// import React, { useEffect, useState } from 'react';
// import RecentTipsCard from '../RecentTipsCard/RecentTipsCard';

// const RecentTips = () => {
//   const [data, setData]=useState([])
//   useEffect(() => {
//       const fetchData = async () => {
//         try {

//           const response = await fetch("http://localhost:3000/activeChallenges");
//           if (!response.ok) {
//             throw new Error("Failed to fetch challenges");
//           }
//           const result = await response.json();
//           setData(result);
//         } catch (error) {
//           console.error("Error fetching challenges:", error);

//         }
//       };
//       fetchData();
//     }, []);
//   return (
//     <div>
//       {
//         data.map((dt)=> <RecentTipsCard key={dt._id} dt={dt} /> )
//       }
//     </div>
//   );
// };

// export default RecentTips;

import React, { useEffect, useState } from "react";
import RecentTipsCard from "../RecentTipsCard/RecentTipsCard";

const RecentTips = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Note: Changed endpoint to /tips instead of /activeChallenges
        const response = await fetch("http://localhost:3000/tips");
        if (!response.ok) {
          throw new Error("Failed to fetch tips");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching tips:", error);
        setError("Failed to load tips");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Eco Tips
            </h2>
            <p className="text-lg text-gray-600">
              Practical advice from our community
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/4"></div>
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recent Eco Tips
          </h2>
          <p className="text-lg text-gray-600">
            Practical advice from our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((dt) => (
            <RecentTipsCard key={dt._id} dt={dt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentTips;
