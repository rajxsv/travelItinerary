import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Mock data for itinerary (this would come from the backend in a real scenario)
const mockItineraries = [
  {
    path: [
      {
        startCity: "Mumbai",
        endCity: "Delhi",
        edges: [
          {
            cost: 5000,
            timeTaken: 120,
            startCity: "Mumbai",
            endCity: "Delhi"
          }
        ]
      }
    ],
    travelCost: 5000,
    travelTime: 120,
    activityCost: 1700,
    activityTime: 330
  },
  {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  },
  {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  },
  {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  }, {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  }, {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  }, {
    path: [
      {
        startCity: "Pune",
        endCity: "Goa",
        edges: [
          {
            cost: 3000,
            timeTaken: 90,
            startCity: "Pune",
            endCity: "Mumbai"
          }
        ]
      }
    ],
    travelCost: 3000,
    travelTime: 90,
    activityCost: 2000,
    activityTime: 180
  }
];

// App component (First Card - Input form)
const App = () => {
  const [tripType, setTripType] = useState('one-way');
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState([]);
  const [tripDuration, setTripDuration] = useState({ days: '', hours: '' });
  const navigate = useNavigate();

  const interestOptions = ['Beach', 'Adventure', 'Culture', 'Nature', 'Food'];

  const handleToggle = () => {
    setTripType(tripType === 'one-way' ? 'two-way' : 'one-way');
    if (tripType === 'two-way') setEndCity('');
  };

  const handleInterestChange = (interest) => {
    setInterests((prev) => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    // Mock submission or backend call
    navigate('/itineraries');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-slate-700 p-8 rounded-lg text-white w-2/3">
        <div className="flex justify-between mb-4">
          <h1 className='text-xl' >Trip Type:</h1>
          <button 
            onClick={handleToggle} 
            className="bg-gray-600 px-2 py-1 rounded text-sm"
          >
            {tripType === 'one-way' ? 'One Way' : 'Two Way'}
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Start City</label>
          <input 
            type="text" 
            value={startCity} 
            onChange={(e) => setStartCity(e.target.value)} 
            className="w-full p-2 rounded bg-gray-600"
          />
        </div>

        {tripType === 'one-way' && (
          <div className="mb-4">
            <label className="block mb-1">End City</label>
            <input 
              type="text" 
              value={endCity} 
              onChange={(e) => setEndCity(e.target.value)} 
              className="w-full p-2 rounded bg-gray-600"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Budget</label>
          <input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)} 
            className="w-full p-2 rounded bg-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Interests</label>
          <div className="flex flex-wrap">
            {interestOptions.map((option) => (
              <button 
                key={option} 
                onClick={() => handleInterestChange(option)} 
                className={`mr-2 mb-2 px-2 py-1 rounded ${interests.includes(option) ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Trip Duration (Days/Hours)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Days" 
              value={tripDuration.days} 
              onChange={(e) => setTripDuration({ ...tripDuration, days: e.target.value })} 
              className="w-1/2 p-2 rounded bg-gray-600"
            />
            <input 
              type="number" 
              placeholder="Hours" 
              value={tripDuration.hours} 
              onChange={(e) => setTripDuration({ ...tripDuration, hours: e.target.value })} 
              className="w-1/2 p-2 rounded bg-gray-600"
            />
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleSubmit} className="w-full bg-blue-500 p-2 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Itineraries component (Second Card - List of Itineraries)
const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch from backend (mock data here)
    setItineraries(mockItineraries);
  }, []);

  const handleSelect = (itinerary) => {
    {console.log(itinerary)}
    navigate('/itinerary-details', { state: itinerary });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-slate-700 p-8 rounded-lg text-white w-2/3 h-2/3 overflow-scroll">
      <h2 className="text-xl mb-4">Available Itineraries</h2>
      <div className="overflow-scroll">
        {itineraries.map((itinerary, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-600 rounded-lg flex justify-between">
            <div>
              <p>{itinerary.path[0].startCity} to {itinerary.path[0].endCity}</p>
              <p>Cost: ${itinerary.travelCost}</p>
              <p>Time: {itinerary.travelTime} mins</p>
            </div>
            <button
              onClick={() => handleSelect(itinerary)}
              className="bg-blue-600 px-2 py-1 rounded-lg mt-2"
              > 
              View Details
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

// ItineraryDetails component (Third Card - Itinerary Details)
const ItineraryDetails = () => {
  const location = useLocation();

  // Safely access location.state or provide a default value if undefined
  const itinerary = location.state? location.state : {};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-slate-700 p-8 rounded-lg text-white w-2/3 h-2/3 overflow-scroll">
      <h2 className="text-xl mb-4">Itinerary Details</h2>
      {itinerary.path ? (
        <div>
          <p>Start City: {itinerary.path[0].startCity}</p>
          <p>End City: {itinerary.path[0].endCity}</p>
          <p>Cost: ${itinerary.travelCost}</p>
          <p>Travel Time: {itinerary.travelTime} mins</p>
          <p>Activity Cost: ${itinerary.activityCost}</p>
          <p>Activity Time: {itinerary.activityTime} mins</p>
        </div>
      ) : (
        <p>No itinerary details found.</p>
      )}
    </div>
  </div>
  );
};
export { App, Itineraries, ItineraryDetails };
