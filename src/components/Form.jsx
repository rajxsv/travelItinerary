import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SESSION_ID = import.meta.env.VITE_SESSION_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

const basePrompt =
  "Given a user query i want you to extract interests from the text but only from the given interests array which is" +
  "[" +
  '"Cultural",' +
  '"French",' +
  '"Italian",' +
  '"Spanish",' +
  '"Dutch",' +
  '"British",' +
  '"German",' +
  '"Czech",' +
  '"Austrian",' +
  '"Portuguese",' +
  '"Hotel",' +
  '"Apartment",' +
  '"Hostel",' +
  '"Eiffel Tower",' +
  '"Louvre Museum",' +
  '"Colosseum",' +
  '"Sagrada Familia",' +
  '"Van Gogh Museum",' +
  '"Big Ben",' +
  '"Berlin Wall",' +
  '"Prague Castle",' +
  '"Schönbrunn Palace",' +
  '"Royal Palace of Madrid",' +
  '"Belém Tower"' +
  "]" +
  "also extract from the text, if you dont find any interest matches just add the most closest ones, userInterests should never be empty" +
  "userInterests: as mentioned above," +
  'userBudget->can be "Low", "Medium" , "High", depends in how expensive can spend' +
  "maxTripDuration in hours" +
  "userMaxBudget in dollars" +
  "return me everything in json and nothing else should be there in query" +
  "if any field is empty user nearest values of fill anything but dont keep them empty" +
  "userText : ";

const Form = ({ handleNext, setLoading }) => {
  const [startCity, setStartCity] = useState("");
  const [budget, setBudget] = useState(0);
  const [interests, setInterests] = useState([]);
  const [tripDuration, setTripDuration] = useState(0);
  const [interestOptions, setInterestOptions] = useState();
  const [aiMode, setAiMode] = useState(false);
  const [prompt, setUserPrompt] = useState("");
  const [aiDataReady, setAiDataReady] = useState(false);
  const [fetchingAI, setFetchingAI] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await axios.get(API_BASE_URL + "/v1/findAllInterests");
        setInterestOptions(res.data);
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

  const fetchPromptAPI = async () => {
    setFetchingAI(true);
    const url = `https://api.on-demand.io/chat/v1/sessions/${SESSION_ID}/query`;
    const data = {
      responseMode: "sync",
      query: basePrompt + prompt,
      endpointId: "predefined-openai-gpt4o",
    };
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      apikey: API_KEY,
    };
    try {
      const response = await axios.post(url, data, { headers });
      const answerString = response.data.data.answer
        .replace(/```json|```/g, "")
        .trim();
      const res = JSON.parse(answerString);

      setBudget(res.userMaxBudget || budget);
      setTripDuration(res.maxTripDuration || tripDuration);
      setInterests(res.userInterests || interests);
      setAiDataReady(true); 
    } catch (error) {
      console.error("Error during request:", error);
    }
    setFetchingAI(false);
  };

  const fetchPrompt = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      await fetchPromptAPI();
    } else {
      alert("Please enter a valid prompt!");
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const tripDurationInHours = tripDuration * 24; 
      let url = startCity
        ? `${API_BASE_URL}/v1/findOptimalTripsWithStartCity?userMaxBudget=${budget}&maxTripDuration=${tripDurationInHours}&userInterests=${interests.toString()}&userBudget=Medium&startCityName=${startCity}`
        : `${API_BASE_URL}/v1/findOptimalTrips?userMaxBudget=${budget}&maxTripDuration=${tripDurationInHours}&userInterests=${interests.toString()}&userBudget=Medium`;

      const response = await axios.get(url);
      if (response.data.length > 1) {
        handleNext(interests, response);
      } else {
        alert("There was some issue, Please try again with a different input");
      }
    } catch (error) {
      console.error("Failed to fetch itineraries:", error);
      alert("Failed to fetch itineraries, Server Issue.");
    } finally {
      setLoading(false);
      setAiDataReady(false);
    }
  };

  useEffect(() => {
    if (aiDataReady) {
      onSubmit();
    }
  }, [aiDataReady]);

  return interestOptions ? (
    <div className="mx-auto bg-gray-900 shadow-lg rounded-xl p-3 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:shadow-pink-500/50">
          {aiMode ? "AI Mode" : "Custom Trip Planner"}
        </h2>
        <button
          onClick={() => setAiMode(!aiMode)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform ${
            aiMode
              ? "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white hover:shadow-gray-500/50 hover:scale-105"
              : "bg-gradient-to-r from-cyan-500 to-yellow-500 bg-clip-text border border-red-700 text-transparent hover:shadow-blue-500 hover:scale-105"
          }`}
        >
          {aiMode ? "Switch to Form" : "Generate using AI ✨"}
        </button>
      </div>    

      {aiMode ? (
        fetchingAI ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-2xl md:text-7xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Plan Your Dream Trip 🌟✈️
            </h2>
            <form
              onSubmit={fetchPrompt}
              className="flex flex-col items-center gap-10 w-full"
            >
              <textarea
                className="min-h-[15rem] text-center w-full md:w-2/3 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Try AI ✨"
                onChange={(e) => setUserPrompt(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Plan My Trip
              </button>
            </form>
            <span className="max-w-[30rem] text-balance text-center text-xs text-zinc-200">
              Try to describe as much as how you feel and about the places you
              want to visit, you can also mention your budget in dollars and
              duration of your trip as well.
            </span>
          </div>
        )
      ) : (
        <form className="space-y-6" onSubmit={onSubmit}>
          <h2 className="text-2xl md:text-7xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Plan Your Dream Trip 🌟✈️
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start City (Optional)
              </label>
              <input
                type="text"
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter start city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Budget
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={budget}
                  min={1}
                  max={2147483646}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter budget"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInterestChange(option)}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      interests.includes(option)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Trip Duration
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Days"
                    value={tripDuration}
                    min={1}
                    onChange={(e) => setTripDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Plan My Trip
          </button>
        </form>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Form;
