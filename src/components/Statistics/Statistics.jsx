// import React, { useEffect, useState } from "react";
// import StatisticsCard from "../StatisticsCard/StatisticsCard";

// const Statistics = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await fetch("http://localhost:3000/static")
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             setData(data);
//           });
//       } catch (error) {
//         console.log("H");
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       {data.map((dt) => (
//         <StatisticsCard key={dt._id} dt={dt} />
//       ))}
//     </div>
//   );
// };

// export default Statistics;

import React, { useEffect, useState } from "react";
import StatisticsCard from "../StatisticsCard/StatisticsCard";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/static");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg mx-6">
        {error}
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Community Impact
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Together we're making a difference for our planet
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((dt) => (
            <StatisticsCard key={dt._id} dt={dt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
