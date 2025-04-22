import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmblaCarousel from "../components/EmblaCarousel";
import countries from "../data/countries";
import categoryImages from "../data/categoryImages"; // Map categories to images

const categories = [
  "drinks",
  "bread",
  "salad",
  "appetizers",
  "breakfast",
  "lunch",
  "dinner",
  "desserts",
  "candy",
  "fast food",
  "world famous",
  "countries",
];

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [showCountries, setShowCountries] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Controls autoplay

  // Get images for the selected category
  const slides = categoryImages[categoryName] || [];
  const options = { loop: true, dragFree: true };

  // ✅ Show game carousel for all categories EXCEPT "countries"
  if (categoryName && categoryName !== "countries") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h1 className="text-4xl text-white font-bold mb-6 capitalize">
          {categoryName} Game 🎮
        </h1>

        {!gameStarted ? (
          <button
            onClick={() => setGameStarted(true)}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold text-xl shadow-md hover:bg-yellow-400 transition"
          >
            Start ▶️
          </button>
        ) : (
          <EmblaCarousel slides={slides} options={options} autoplay={true} />
        )}
      </div>
    );
  }

  // ✅ Show country selection if "countries" is chosen
  if (categoryName === "countries" || showCountries) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-6 text-yellow-500">Choose a Country 🌍</h1>
        <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-lg w-3/4 bg-white">
          <div className="max-h-64 overflow-y-auto">
            {countries.map(({ name, flag, code }) => (
              <div
                key={code}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/game/countries/${code}`)}
              >
                <img src={flag} alt={name} className="w-6 h-6 rounded-full" />
                <span className="text-lg">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default: Show category selection
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6 text-yellow-500">Choose Your Food Category</h1>
      
      <table className="border-collapse border border-gray-300 w-3/4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-3 text-lg">Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() =>
                category === "countries"
                  ? setShowCountries(true)
                  : navigate(`/game/${category}`)
              }
            >
              <td className="border border-gray-400 p-4 text-xl font-semibold capitalize">
                {category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
