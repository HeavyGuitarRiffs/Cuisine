import { useState } from "react";

const foodPairs = {
  Drinks: [
    { name: "Coffee", image: "/images/coffee.jpg" },
    { name: "Tea", image: "/images/tea.jpg" },
    { name: "Soda", image: "/images/soda.jpg" },
    { name: "Juice", image: "/images/juice.jpg" },
  ],
  Snacks: [
    { name: "Chips", image: "/images/chips.jpg" },
    { name: "Popcorn", image: "/images/popcorn.jpg" },
    { name: "Cookies", image: "/images/cookies.jpg" },
    { name: "Pretzels", image: "/images/pretzels.jpg" },
  ],
};

export default function FoodComparison({ category }) {
  const foods = foodPairs[category] || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (foods.length < 2) return <p>No foods available for this category.</p>;

  const handleChoice = () => {
    setScore(score + 1);
    setIndex((prevIndex) => (prevIndex + 2 < foods.length ? prevIndex + 2 : 0));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Pick Your Favorite</h2>
      <p className="mb-4 text-lg">Score: {score}</p>

      <div className="flex space-x-4">
        {[foods[index], foods[index + 1]].map((food, idx) => (
          <button
            key={idx}
            className="p-4 bg-white shadow-lg rounded-lg transition-transform hover:scale-105"
            onClick={handleChoice}
          >
            <img src={food.image} alt={food.name} className="w-32 h-32 rounded-md" />
            <p className="mt-2 text-lg font-semibold">{food.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
