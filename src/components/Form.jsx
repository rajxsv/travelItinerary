import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Form = ({ handleNext, setLoading }) => {
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState([]);
  const [tripDuration, setTripDuration] = useState({ days: "", hours: "" });
  const [interestOptions, setInterestOptions] = useState();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await axios.get(API_BASE_URL + "/findAllInterests");
        setInterestOptions(res.data[0].split(","));
      } catch (err) {
        console.log("Can't fetch All Interests", err);
      }
    };
    fetchInterests();
  }, []);

  const handleInterestChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const onSubmit = async () => {
    setLoading(true); 
    try {
      const res = await axios.get(
        `${API_BASE_URL}/find?startCity=${startCity}&endCity=${endCity}&maxBudget=${budget}&maxDuration=${
          tripDuration.days * 24 + parseInt(tripDuration.hours)
        }`
      );
      handleNext(res.data,interests);
    } catch (error) {
      console.log("Failed to fetch itineraries", error);
    } finally {
      setLoading(false); 
    }
  };
  
  return interestOptions ? (
    <div>
      <h2 className="text-xl mb-4">Trip Planner</h2>
      <div className="mb-4">
        <label className="block mb-1">Start City</label>
        <input
          type="text"
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          className="w-full p-2 rounded bg-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">End City</label>
        <input
          type="text"
          value={endCity}
          onChange={(e) => setEndCity(e.target.value)}
          className="w-full p-2 rounded bg-gray-600"
        />
      </div>
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
              className={`mr-2 mb-2 px-2 py-1 rounded ${
                interests.includes(option) ? "bg-blue-500" : "bg-gray-600"
              }`}
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
            onChange={(e) =>
              setTripDuration({ ...tripDuration, days: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-600"
          />
          <input
            type="number"
            placeholder="Hours"
            value={tripDuration.hours}
            onChange={(e) =>
              setTripDuration({ ...tripDuration, hours: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-600"
          />
        </div>
      </div>
      <button onClick={onSubmit} className="bg-blue-500 p-2 rounded">
        Next
      </button>
    </div>
  ) : <Loader />;
};

export default Form;
