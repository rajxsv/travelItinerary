import React from "react";

const Itinerary = ({ itinerary, userInterests }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl">
      <h2 className="text-5xl sm:text-6xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-transparent bg-clip-text">
        Your Epic Adventure Awaits 🌍✨
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InfoCard
            icon="🏁"
            label="Start City"
            value={itinerary.path[0].startCity}
          />
          <InfoCard
            icon="🏆"
            label="End City"
            value={itinerary.path[0].endCity}
          />
          <InfoCard
            icon="💰"
            label="Cost"
            value={`$${itinerary.travelCost}`}
            valueClass="text-green-400"
          />
          <InfoCard
            icon="⏱️"
            label="Travel Time"
            value={`${Math.floor(itinerary.travelTime / 60)}h ${
              itinerary.travelTime % 60
            }m`}
            valueClass="text-yellow-400"
          />
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Route with Interests 🗺️
          </h3>
          <p className="mb-4 text-sm text-cyan-100">
            Cities with your interests are highlighted in green
          </p>
          <div className="space-y-4">
            {itinerary.citiesWithInterests.map((city) => (
              <CityCard
                key={city.cityName}
                city={city}
                userInterests={userInterests}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, valueClass = "text-blue-300" }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex items-center mb-2">
      <span className="text-2xl mr-2">{icon}</span>
      <h4 className="text-lg font-medium text-gray-300">{label}</h4>
    </div>
    <p className={`text-xl font-semibold ${valueClass}`}>{value}</p>
  </div>
);

const CityCard = ({ city, userInterests }) => {
  const handleSearch = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      city.cityName
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="md:flex  justify-between w-ful mb-2">
        <h4 className="text-xl font-semibold text-blue-400 mb-3">
          {city.cityName}
        </h4>
        <button
          onClick={handleSearch}
          className="px-2 text-sm py-1 bg-slate-900 hover:bg-slate-950 rounded-lg"
        >
          Discover More Hidden Gems in This City ✨
        </button>
      </div>
      <ul className="space-y-2">
        {city.accomodations?.map((ele) => (
          <p
            className={`${
              userInterests.includes(ele) ? "bg-green-900" : ""
            } p-2 rounded-lg`}
          >
            {ele}
          </p>
        ))}
        {city.activities?.map((ele) => (
          <p
            className={`${
              userInterests.includes(ele) ? "bg-green-900" : ""
            } p-2 rounded-lg`}
          >
            {ele}
          </p>
        ))}
        {city.restraunts?.map((ele) => (
          <p
            className={`${
              userInterests.includes(ele) ? "bg-green-900" : ""
            } p-2 rounded-lg`}
          >
            {ele}
          </p>
        ))}
        {city.attractions?.map((ele) => (
          <p
            className={`${
              userInterests.includes(ele) ? "bg-green-900" : ""
            } p-2 rounded-lg`}
          >
            {ele}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default Itinerary;
