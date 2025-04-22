import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import countryFoods from "../data/countries";
import React from "react";
import classNames from "classnames";

export default function GamePage() {
  const { category, countryCode } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameMode = searchParams.get("game");
  const navigate = useNavigate();

  const images = useMemo(() => countryFoods[countryCode] || [], [countryCode]);
  const [rankedFoods, setRankedFoods] = useState([null, null, null, null, null]); // 5 ranking slots

  useEffect(() => {
    if (category === "countries" && !countryCode) {
      navigate("/game/countries");
    }
  }, [category, countryCode, navigate]);

  const handleFoodClick = (food, index) => {
    // Try to rank the food item, if slot is not filled yet
    if (!rankedFoods[index]) {
      const newRanking = [...rankedFoods];
      newRanking[index] = food;
      setRankedFoods(newRanking);
    }
  };

  const handleResetRanking = () => {
    setRankedFoods([null, null, null, null, null]);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-yellow-500">
        {countryCode ? countryCode.toUpperCase() : "Select a Country"}
      </h1>
      <p className="text-lg mb-4">
        {gameMode === "ranking" ? "🔢 Rank these traditional dishes!" : "⚖️ Compare these delicious foods!"}
      </p>

      {/* Display foods in a table for ranking */}
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl mb-6 mx-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Origin</th>
            <th className="border border-gray-300 px-4 py-2">Inventor</th>
            <th className="border border-gray-300 px-4 py-2">Rank</th>
          </tr>
        </thead>
        <tbody>
          {images.map((food) => (
            <tr key={food.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                <img
                  src={food.src}
                  alt={food.name}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer"
                  onClick={() => handleFoodClick(food, rankedFoods.indexOf(null))}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{food.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{food.origin}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{food.inventor}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {rankedFoods.includes(food) ? `Ranked` : "Click to Rank"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display ranked food items */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Rankings:</h2>
        <ul>
          {rankedFoods.map((food, index) => (
            <li key={index} className="text-xl font-medium text-gray-600">
              {food ? `${index + 1}. ${food.name}` : `Rank ${index + 1}: Not ranked`}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset rankings */}
      <button
        onClick={handleResetRanking}
        className={classNames(
          "mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl shadow-lg transition-all transform",
          "hover:bg-gray-700 hover:scale-105 active:scale-95"
        )}
      >
        Reset Rankings
      </button>

      <button
        onClick={() => navigate(`/game/countries?game=${gameMode}`)}
        className={classNames(
          "mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl shadow-lg transition-all transform",
          "hover:bg-gray-700 hover:scale-105 active:scale-95"
        )}
      >
        ⬅️ Back to Countries
      </button>
    </div>
  );
}
