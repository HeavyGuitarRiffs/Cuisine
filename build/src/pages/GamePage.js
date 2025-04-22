import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import countryFoods from "../data/countries";

export default function GamePage() {
  const { category, countryCode } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameMode = searchParams.get("game");
  const navigate = useNavigate();

  useEffect(() => {
    if (category === "countries" && !countryCode) {
      navigate("/game/countries");
    }
  }, [category, countryCode, navigate]);

  const defaultFoodData = [
    { id: "1", name: "Coffee", src: "/images/coffee.jpg", inventor: "Ethiopians", origin: "Ethiopia", age: "9th century" },
    { id: "2", name: "Milkshake", src: "/images/milkshake.jpg", inventor: "Unknown", origin: "USA", age: "20th century" },
    { id: "3", name: "Tea", src: "/images/tea.jpg", inventor: "Chinese", origin: "China", age: "2737 BC" },
    { id: "4", name: "Soda", src: "/images/soda.jpg", inventor: "Joseph Priestley", origin: "England", age: "1767" },
    { id: "5", name: "Mojito", src: "/images/mojito.jpg", inventor: "Joseph Priestley", origin: "Cuba", age: "16th century" },
    { id: "6", name: "Lemonade", src: "/images/lemonade.jpg", inventor: "Unknown", origin: "Egypt", age: "12th century" },
    { id: "7", name: "Hot Chocolate", src: "/images/hotchocolate.jpg", inventor: "Mesoamerican", origin: "Mexico", age: "1500 BC" },
    { id: "8", name: "Iced Tea", src: "/images/icedtea.jpg", inventor: "Richard Blechynden", origin: "USA", age: "1904" },
    { id: "9", name: "Smoothie", src: "/images/smoothie.jpg", inventor: "Stephen Kuhnau", origin: "USA", age: "1960s" }
  ];
  
  const foodOptions = countryFoods[countryCode] || defaultFoodData;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedFood(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">🍔 Rank Your Favorite Foods!</h1>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-500">
          {countryCode?.toUpperCase() || "Food Ranking"}
        </h1>
        <p className="text-lg mb-4">
          {gameMode === "ranking"
            ? "🔢 Rank these traditional dishes!"
            : "⚖️ Compare these delicious foods!"}
        </p>

        {/* Display foods as a table */}
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Origin</th>
              <th className="border border-gray-300 px-4 py-2">Inventor</th>
            </tr>
          </thead>
          <tbody>
            {foodOptions.map((food) => (
              <tr key={food.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={food.src}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    onClick={() => handleFoodClick(food)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{food.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{food.origin}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{food.inventor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for food details */}
      {showPopup && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedFood.name}</h2>
            <img src={selectedFood.src} alt={selectedFood.name} className="w-32 h-32 object-cover rounded-md mx-auto mb-4" />
            <p><strong>Inventor:</strong> {selectedFood.inventor}</p>
            <p><strong>Origin:</strong> {selectedFood.origin}</p>
            <p><strong>Age:</strong> {selectedFood.age}</p>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
