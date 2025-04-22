import { useState } from "react";
import { useLocation } from "react-router-dom";
import FoodComparison from "../components/FoodComparison";

export default function ComparisonGame() {
  const location = useLocation();
  const selectedCategory = location.state?.category || null;
  const [category, setCategory] = useState(selectedCategory);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Comparison Game</h1>

      {!category ? (
        <div>
          <p className="text-lg mb-6">Choose a category to start!</p>
          <div className="flex justify-center space-x-4">
            {["Drinks", "Snacks"].map((cat) => (
              <button
                key={cat}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-lg shadow-lg"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p className="text-lg mb-6">
            You selected: <strong>{category}</strong>
          </p>
          <FoodComparison category={category} />
        </>
      )}
    </div>
  );
}
