import React from "react";

const Itinerary = ({ itinerary }) => {
  return (
    <div className="bg-gray-700 p-6 min-w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">Itinerary Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-lg font-medium text-white">
          <p>Start City:</p>
          <p className="text-blue-300">{itinerary.path[0].startCity}</p>
        </div>
        <div className="flex justify-between text-lg font-medium text-white">
          <p>End City:</p>
          <p className="text-blue-300">{itinerary.path[0].endCity}</p>
        </div>
        <div className="flex justify-between text-lg font-medium text-white">
          <p>Cost:</p>
          <p className="text-green-300">${itinerary.travelCost}</p>
        </div>
        <div className="flex justify-between text-lg font-medium text-white">
          <p>Travel Time:</p>
          <p className="text-yellow-300">
            {Math.floor(itinerary.travelTime / 60)} hours {itinerary.travelTime %  60} mins
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Cities and Interests</h3>
          {itinerary.citiesWithInterests.map((ele) => (
            <div key={ele.cityName} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">{ele.cityName}</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                {ele.interests.map((ele2, index) => (
                  <li key={index} className="pl-4">{ele2}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
