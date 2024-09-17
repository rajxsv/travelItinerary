import React from "react";

const Itineraries = ({ itineraries, handleSelectItinerary }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">Available Itineraries</h2>
      <div className="space-y-4">
        {itineraries.map((itinerary, index) => (
          <div
            key={index}
            className="p-4 bg-gray-700 rounded-lg flex justify-between items-center shadow-md"
          >
            <div className="flex flex-col space-y-2 text-white">
              <p className="text-lg font-semibold text-blue-300">{itinerary.path[0].startCity} to {itinerary.path[0].endCity}</p>
              <p className="text-sm">Cost: <span className="text-green-400">${itinerary.travelCost}</span></p>
              <p className="text-sm">Time: <span className="text-yellow-400">{itinerary.travelTime} mins</span></p>
              <p className="text-sm">Match Score: <span className="text-red-400">{itinerary.matchScore}</span></p>
            </div>
            <button
              onClick={() => handleSelectItinerary(itinerary)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;
