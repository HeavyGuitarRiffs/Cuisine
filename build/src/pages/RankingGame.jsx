import { Link } from "react-router-dom";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react"; // Embla Carousel hook
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DraggableFoodList from "../components/DraggableFoodList"; // You may keep this component for draggable food list
import RankingZones from "../components/RankingZones"; // For ranking spots (tables)
import "./embla.css";

const initialFoods = [
  { id: "1", name: "Pizza", src: "/images/pizza.jpg" },
  { id: "2", name: "Sushi", src: "/images/sushi.jpg" },
  { id: "3", name: "Burger", src: "/images/burger.jpg" },
  { id: "4", name: "Tacos", src: "/images/tacos.jpg" },
  { id: "5", name: "Pasta", src: "/images/pasta.jpg" },
  { id: "6", name: "Salad", src: "/images/salad.jpg" },
  { id: "7", name: "Ramen", src: "/images/ramen.jpg" },
  { id: "8", name: "Hotdog", src: "/images/hotdog.jpg" },
  { id: "9", name: "Burrito", src: "/images/burrito.jpg" },
  { id: "10", name: "Sushi", src: "/images/sushi.jpg" },
  { id: "11", name: "Steak", src: "/images/steak.jpg" },
  { id: "12", name: "Ice Cream", src: "/images/icecream.jpg" },
  { id: "13", name: "Fried Chicken", src: "/images/fried_chicken.jpg" },
  { id: "14", name: "Donuts", src: "/images/donuts.jpg" },
  { id: "15", name: "Cheeseburger", src: "/images/cheeseburger.jpg" },
  { id: "16", name: "Pancakes", src: "/images/pancakes.jpg" },
  { id: "17", name: "Fries", src: "/images/fries.jpg" },
  { id: "18", name: "Waffles", src: "/images/waffles.jpg" },
  { id: "19", name: "Tacos", src: "/images/tacos.jpg" },
  { id: "20", name: "Pizza", src: "/images/pizza.jpg" },
  { id: "21", name: "Kebab", src: "/images/kebab.jpg" },
  { id: "22", name: "Curry", src: "/images/curry.jpg" },
  { id: "23", name: "Burgers", src: "/images/burgers.jpg" },
  { id: "24", name: "Sushi Rolls", src: "/images/sushi_rolls.jpg" },
  { id: "25", name: "Lasagna", src: "/images/lasagna.jpg" },
  { id: "26", name: "Pasta", src: "/images/pasta.jpg" },
  { id: "27", name: "Soup", src: "/images/soup.jpg" },
  { id: "28", name: "Fried Rice", src: "/images/fried_rice.jpg" },
  { id: "29", name: "Spaghetti", src: "/images/spaghetti.jpg" },
  { id: "30", name: "Sushi Sashimi", src: "/images/sushi_sashimi.jpg" },
  { id: "31", name: "Chicken Wings", src: "/images/chicken_wings.jpg" },
  { id: "32", name: "Spring Rolls", src: "/images/spring_rolls.jpg" },
];

// Function to chunk the food list into 16-item groups for each table
const chunkItems = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const tables = chunkItems(initialFoods, 16); // Split into two tables (or more, based on number of items)

const RankingGame = () => {
  const [rankings, setRankings] = useState({});
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  const handleDrop = (e, rank) => {
    e.preventDefault();
    const food = JSON.parse(e.dataTransfer.getData("text/plain"));

    setRankings((prev) => ({
      ...prev,
      [rank]: food, // Assign food to the rank slot
    }));
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Ranking Game</h1>
      <p className="text-lg mb-6">Rank your favorite foods from different categories!</p>

      {/* Draggable Food List */}
      <DraggableFoodList foods={initialFoods} />

      {/* Carousel with two tables */}
      <div className="carousel-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {tables.map((tableItems, index) => (
              <div key={index} className="embla__slide">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Rank</th>
                      <th className="px-4 py-2">Food</th>
                      <th className="px-4 py-2">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableItems.map((item, i) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">
                          <img src={item.src} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-button left-button"
          onClick={() => emblaRef.current.scrollPrev()}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button right-button"
          onClick={() => emblaRef.current.scrollNext()}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Ranking Zones */}
      <RankingZones onDrop={handleDrop} allowDrop={allowDrop} rankings={rankings} />

      {/* Choose Category Button */}
      <div className="mt-6">
        <Link to="/categories">
          <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full max-w-xs text-lg shadow-lg">
            Choose a Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RankingGame;
