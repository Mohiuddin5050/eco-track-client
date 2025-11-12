import React, { useEffect, useState } from "react";
import EventsTipsCard from "../components/EventsTipsCard/EventsTipsCard";
import ActiveChallengeCard from "../components/ActiveChallengeCard/ActiveChallengeCard";

const Challenges = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("http://localhost:3000/challenges")
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setData(data);
          });
      } catch (error) {
        console.log("H");
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            All Challenges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((dt) => (
            <ActiveChallengeCard key={dt._id} dt={dt} /> // Fixed: using dt._id
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
