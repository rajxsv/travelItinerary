import React from "react";

const Itineraries = ({ itineraries, handleSelectItinerary }) => {
  return (
    <div className="bg-gray-900 p-8 w-full shadow-lg shadow-gray-200 rounded-xl">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
        Explore Your Custom Itineraries 🗺️✨
      </h2>
      <div className="space-y-6">
        {itineraries.map((itinerary, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-300">
                  {itinerary.path[0].startCity} to {itinerary.path[0].endCity}
                </h3>
                <span className="text-sm font-medium text-gray-400">
                  #{index + 1}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Cost</p>
                  <p className="text-lg font-semibold text-green-400">
                    ${itinerary.travelCost}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-lg font-semibold text-yellow-400">
                    {Math.floor(itinerary.travelTime / 60 / 24)
                      ? Math.floor(itinerary.travelTime / 60 / 24) + " days "
                      : ""}{" "}
                    {Math.floor(itinerary.travelTime / 60)
                      ? Math.floor(itinerary.travelTime / 60) + " hours "
                      : ""}{" "}
                    {itinerary.travelTime % 60
                      ? (itinerary.travelTime % 60) + " mins"
                      : ""}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Match Score</p>
                  <p className="text-lg font-semibold text-red-400">
                    {itinerary.matchScore}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectItinerary(itinerary)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Select This Itinerary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;
