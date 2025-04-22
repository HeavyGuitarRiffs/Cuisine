import { Link } from "react-router-dom";

const categories = [
  { name: "Drinks", emoji: "🍹" },
  { name: "Bread", emoji: "🥖" },
  { name: "Salad", emoji: "🥗" },
  { name: "Appetizers", emoji: "🍤" },
  { name: "Breakfast", emoji: "🥞" },
  { name: "Lunch", emoji: "🍛" },
  { name: "Dinner", emoji: "🍽️" },
  { name: "Candy", emoji: "🍬" },
  { name: "Countries", emoji: "🌍" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Fast Food", emoji: "🍔" },
  { name: "World Famous", emoji: "🏆" },
];

export default function CategorySelector() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800 drop-shadow-lg">
        Choose a Category
      </h1>

      <table className="border-collapse border border-gray-300 bg-white shadow-xl rounded-lg text-center">
        <tbody>
          {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border">
              {categories.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => (
                <td key={category.name} className="border p-8">
                  <Link
                    to={`/categories/${category.name.toLowerCase().replace(/\s/g, "-")}`}
                    className="flex flex-col items-center text-2xl font-bold text-gray-700 hover:scale-110 transition transform duration-200"
                  >
                    <span className="text-6xl">{category.emoji}</span>
                    <span className="mt-3">{category.name}</span>
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
