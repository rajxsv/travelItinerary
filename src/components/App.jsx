import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Form from "./Form";
import Itineraries from "./Itineraries";
import Itinerary from "./Itinerary";

const App = () => {
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem("step")) || 1;
  });

  const [loading, setLoading] = useState(false);
  const [itineraries, setItineraries] = useState(() => {
    return JSON.parse(localStorage.getItem("itineraries")) || [];
  });

  const [selectedItinerary, setSelectedItinerary] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedItinerary")) || null;
  });

  const [userInterests, setUserInterests] = useState(() => {
    return JSON.parse(localStorage.getItem("userInterests")) || [];
  });

  // Save the current state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("itineraries", JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem("selectedItinerary", JSON.stringify(selectedItinerary));
  }, [selectedItinerary]);

  useEffect(() => {
    localStorage.setItem("userInterests", JSON.stringify(userInterests));
  }, [userInterests]);

  const handleNext = (interests, resNew) => {
    setUserInterests(interests);
    const transformedItineraries = transformApiData2(resNew, interests);
    setItineraries(transformedItineraries);
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
          >
            ← Back
          </button>
        )}

        <div className="bg-gray-900 w-full rounded-xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-8">
              <Loader />
            </div>
          ) : (
            <>
              {step === 1 && (
                <Form handleNext={handleNext} setLoading={setLoading} />
              )}
              {step === 2 && (
                <Itineraries
                  itineraries={itineraries}
                  handleSelectItinerary={handleSelectItinerary}
                />
              )}
              {step === 3 && selectedItinerary && (
                <Itinerary
                  itinerary={selectedItinerary}
                  userInterests={userInterests}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const transformApiData2 = (apiData, userInterests) => {
  const transformedItineraries = apiData.data.map((path) => {
    const startCity = path.citiesInPath[0].cityName;
    const endCity = path.citiesInPath[path.citiesInPath.length - 1].cityName;
    const travelCost = path.tripCost;
    const travelTime = path.tripDuration * 60;

    const citiesWithInterests = path.citiesInPath.map((city) => ({
      cityName: city.cityName,
      accomodations: city.accomodations,
      attractions: city.attractions,
      activities: city.activities,
      restraunts: city.restraunts,
    }));

    const matchScore = citiesWithInterests.reduce((score, city) => {
      const categories = ['activities', 'accommodations', 'restaurants', 'attractions'];
    
      categories.forEach((category) => {
        if (city[category]) {
          score += city[category].filter((interest) => userInterests.includes(interest)).length;
        }
      });
  
      return score;
    }, 0);

    return {
      path: [{ startCity, endCity, citiesInPath: path.citiesInPath }],
      travelCost,
      travelTime,
      matchScore,
      citiesWithInterests,
    };
  });

  return transformedItineraries.sort((a, b) => b.matchScore - a.matchScore);
};

export { App };
