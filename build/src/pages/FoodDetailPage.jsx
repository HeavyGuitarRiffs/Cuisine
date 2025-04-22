import { Link, useParams } from "react-router-dom";

const foodData = {
  burger: {
    name: "Cheeseburger",
    image: "https://source.unsplash.com/600x400/?burger",
    description: "A delicious cheeseburger with fresh ingredients.",
    category: "Fast Food",
    origin: "USA",
    rating: "4.8/5",
  },
  sushi: {
    name: "Sushi",
    image: "https://source.unsplash.com/600x400/?sushi",
    description: "A fresh sushi platter with wasabi and soy sauce.",
    category: "Japanese Cuisine",
    origin: "Japan",
    rating: "4.9/5",
  },
};

const FoodDetailPage = () => {
  const { foodId } = useParams();
  const food = foodData[foodId];

  if (!food) {
    return <p className="text-center text-red-500 text-xl mt-10">Food not found!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <img src={food.image} alt={food.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{food.name}</h1>
      <p className="text-gray-600 mt-2">{food.description}</p>
      <p className="mt-2"><strong>Category:</strong> {food.category}</p>
      <p className="mt-1"><strong>Origin:</strong> {food.origin}</p>
      <p className="mt-1"><strong>Rating:</strong> ⭐ {food.rating}</p>

      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default FoodDetailPage;
