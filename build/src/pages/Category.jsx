import { Link, useLocation, useNavigate } from "react-router-dom";

const categories = [
  { id: "world-famous", name: "🌎 World Famous", image: "/images/world-famous.jpg" },
  { id: "country", name: "🏳️ Country", image: "/images/country.jpg" },
  { id: "drinks", name: "🥤 Drinks", image: "/images/drinks.jpg" },
  { id: "fast-food", name: "🍔 Fast Food", image: "/images/fast-food.jpg" },
  { id: "desserts", name: "🍨 Desserts", image: "/images/desserts.jpg" },
  { id: "cakes", name: "🎂 Cakes", image: "/images/cakes.jpg" },
  { id: "candy", name: "🍬 Candy", image: "/images/candy.jpg" },
];

export default function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameMode = searchParams.get("game") || "ranking"; // Default to ranking

  const handleCategorySelect = (categoryId) => {
    const nextPage = gameMode === "ranking" ? "/ranking-game" : "/comparison";
    navigate(`${nextPage}?category=${categoryId}`);
  };
  

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-8">Choose a Category!</h1>
      <p className="text-lg mb-4">
        {gameMode === "ranking"
          ? "🔢 You chose the Ranking Game! Pick a category to start ranking."
          : "⚖️ You chose the Comparison Game! Pick a category to compare foods."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className="relative bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden cursor-pointer 
              transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <img
              src={category.image || "/images/placeholder.jpg"}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t-3xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 drop-shadow-md">{category.name}</h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 opacity-0 transition-opacity duration-500 hover:opacity-40"></div>
          </button>
        ))}
      </div>

      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-xl shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95">
          ⬅️ Back to Home
        </button>
      </Link>
    </div>
  );
}
