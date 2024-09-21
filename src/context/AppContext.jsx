import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem('step')) || 1;
  });
  
  const [itineraries, setItineraries] = useState(() => {
    return JSON.parse(localStorage.getItem('itineraries')) || [];
  });

  const [selectedItinerary, setSelectedItinerary] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedItinerary')) || null;
  });

  const [userInterests, setUserInterests] = useState(() => {
    return JSON.parse(localStorage.getItem('userInterests')) || [];
  });

  useEffect(() => {
    localStorage.setItem('step', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('itineraries', JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem('selectedItinerary', JSON.stringify(selectedItinerary));
  }, [selectedItinerary]);

  useEffect(() => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [userInterests]);

  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        itineraries,
        setItineraries,
        selectedItinerary,
        setSelectedItinerary,
        userInterests,
        setUserInterests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
