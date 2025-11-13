import React, { useEffect } from "react";
import { Link } from "react-router";
import Aos from "aos";
import 'aos/dist/aos.css';

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="carousel w-full h-[420px] rounded-xl shadow-lg mt-6">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full" data-aos="fade-up">
        <img
          src={
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
          }
          className="w-full object-cover"
        />

        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
          <h2 className="text-4xl font-bold" data-aos="fade-up">Reduce Plastic Challenge</h2>
          <p className="mt-2 text-lg max-w-xl">
            Take small steps to cut down plastic waste and protect the planet.
          </p>
          <Link to="/challenges" className="btn btn-primary mt-4">
            Get Started
          </Link>
        </div>

        <a href="#slide3" className="btn btn-circle absolute left-5 top-1/2">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle absolute right-5 top-1/2">
          ❯
        </a>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full" data-aos="fade-up">
        <img
          src={
            "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=1200"
          }
          className="w-full object-cover"
        />

        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
          <h2 className="text-4xl font-bold" data-aos="fade-up">Daily Eco Activity</h2>
          <p className="mt-2 text-lg max-w-xl">
            Complete simple tasks each day and track your green journey.
          </p>
          <Link to="/activities" className="btn btn-primary mt-4">
            Explore Activities
          </Link>
        </div>

        <a href="#slide1" className="btn btn-circle absolute left-5 top-1/2">
          ❮
        </a>
        <a href="#slide3" className="btn btn-circle absolute right-5 top-1/2">
          ❯
        </a>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full" data-aos="fade-up">
        <img
          src={
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
          }
          className="w-full object-cover"
        />

        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
          <h2 className="text-4xl font-bold" data-aos="fade-up">Join the EcoTrack Community</h2>
          <p className="mt-2 text-lg max-w-xl">
            Build habits, join challenges, and inspire others.
          </p>
          <Link to="/register" className="btn btn-primary mt-4">
            Join Now
          </Link>
        </div>

        <a href="#slide2" className="btn btn-circle absolute left-5 top-1/2">
          ❮
        </a>
        <a href="#slide1" className="btn btn-circle absolute right-5 top-1/2">
          ❯
        </a>
      </div>
    </div>
  );
};

export default Banner;
