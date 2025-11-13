import React from "react";
import { Link } from "react-router";
import useTitle from "../hooks/useTitle";

const ErrorPage = () => {
  useTitle("404 Not Found");
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated Illustration */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto mb-6 relative">
            {/* Main planet */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg"></div>

            {/* Crater details */}
            <div className="absolute top-8 left-12 w-8 h-8 bg-green-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-6 h-6 bg-green-200 rounded-full opacity-70"></div>
            <div className="absolute top-16 right-12 w-4 h-4 bg-green-100 rounded-full opacity-80"></div>

            {/* Astronaut */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Head */}
                <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-300 mx-auto"></div>
                {/* Body */}
                <div className="w-16 h-20 bg-white rounded-t-lg mx-auto -mt-2 border-4 border-gray-300"></div>
                {/* Flag */}
                <div className="absolute -right-6 top-4">
                  <div className="w-2 h-8 bg-gray-400"></div>
                  <div className="w-6 h-4 bg-red-500 -mt-8 ml-2 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full opacity-60 animate-bounce"></div>
            <div
              className="absolute -bottom-2 -right-4 w-6 h-6 bg-blue-200 rounded-full opacity-70 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* 404 Text */}
          <div className="text-9xl font-bold text-gray-900 mb-4 relative">
            <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Lost in Space?
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for seems to have drifted off into the
            cosmos.
          </p>
          <p className="text-gray-500">
            Don't worry, even the most sustainable journeys have unexpected
            detours!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            to="/challenges"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Explore Challenges
          </Link>
        </div>

        {/* Fun Facts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <span>🌍</span>
            Eco Fact While You're Here
          </h3>
          <p className="text-gray-600 text-sm">
            Did you know? Recycling one aluminum can saves enough energy to
            power a TV for 3 hours! Every small action counts in our journey
            towards sustainability.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
