import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Form from "./Form";
import Itineraries from "./Itineraries";
import Itinerary from "./Itinerary";

const App = () => {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const handleNext = (apiData, userInterests) => {
    console.log("API Interests:", apiData.interests);
    console.log("User Interests:", userInterests);
  
    const transformedItineraries = apiData.paths.map((path) => {
      const startCity = path.nodes[0].name;
      const endCity = path.nodes[path.nodes.length - 1].name;
      const via = path.nodes;
      const travelCost = path.totalCost;
      const travelTime = path.totalTime * 60; 
    
      let matchScore = 0;
    
      const matchInterests = (cityInterests) => {
        return cityInterests.filter((interest) => userInterests.includes(interest)).length;
      };
    
      const citiesWithInterests = via.map((city) => {
        const cityName = city.name;
        const cityInterests = JSON.parse(apiData.interests[cityName]?.[0] || "{}").interests || [];
        
        console.log(`City: ${cityName}, Interests:`, cityInterests);
    
        matchScore += matchInterests(cityInterests);
    
        return {
          cityName,
          interests: cityInterests,
        };
      });
    
      return {
        path: [{ startCity, endCity, edges: path.edges, via }],
        travelCost,
        travelTime,
        matchScore, 
        citiesWithInterests, 
      };
    });
    
    const sortedItineraries = transformedItineraries.sort((a, b) => b.matchScore - a.matchScore);
    
    setItineraries(sortedItineraries);
    setStep(2);
  };
  
  

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setStep(3); 
  };

  return (
    <div className="flex flex-col justify-items-start gap-7 w-full items-center h-screen bg-gray-800">
      <div className="flex justify-start w-2/3 m-2" >
        {step > 1 && (
          <button onClick={handleBack} className="text-white bg-blue-500 p-2 rounded">
              Back
            </button>
          )}
      </div>
      <div className="bg-slate-700 p-8 rounded-lg text-white md:w-2/3 h-3/4 overflow-scroll">
        <div className="mt-4 flex justify-between">
        </div>
        {loading && <Loader />} 
        {!loading && step === 1 && (
          <Form handleNext={handleNext} setLoading={setLoading} />
        )}
        <div className=" overflow-scroll">
          {!loading && step === 2 && (
            <Itineraries
            itineraries={itineraries}
            handleSelectItinerary={handleSelectItinerary}
            />
          )}
          
        </div>
        {!loading && step === 3 && selectedItinerary && (
          <Itinerary itinerary={selectedItinerary} />
        )}
        
      </div>
    </div>
  );
};

export {App};
