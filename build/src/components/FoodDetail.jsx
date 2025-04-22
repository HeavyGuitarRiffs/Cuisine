import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const foodData = [
  {
    name: "Sushi",
    image: "/sushi.jpg",
    description: "Sushi is a traditional Japanese dish featuring vinegared rice, seafood, and vegetables.",
    id: 1,
  },
  {
    name: "Pizza",
    image: "/pizza.jpg",
    description: "Pizza is a popular Italian dish made with a round, flat base topped with sauce, cheese, and various toppings.",
    id: 2,
  },
  {
    name: "Burger",
    image: "/burger.jpg",
    description: "A burger consists of a cooked patty, often beef, placed in a bun with condiments and vegetables.",
    id: 3,
  },
];

export default function FoodDetail() {
  const [showRecipe, setShowRecipe] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rankedFood, setRankedFood] = useState([]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleFoodImageClick = (food) => {
    if (!rankedFood.includes(food)) {
      setRankedFood([...rankedFood, food]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6"
    >
      <Card className="w-96 text-center shadow-lg">
        <CardContent className="p-4">
          <motion.img 
            src={foodData[0].image} 
            alt={foodData[0].name} 
            className="w-full h-48 object-cover rounded-lg" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
          />
          <h2 className="text-2xl font-bold mt-4">{foodData[0].name}</h2>
          <p className="text-gray-600 mt-2">{foodData[0].description}</p>

          {/* Star Rating */}
          <div className="mt-4 flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition-all ${
                  rating >= star ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">{rating > 0 ? `You rated: ${rating}/5` : "Rate this food!"}</p>

          {/* Similar Foods */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Similar Foods</h3>
            <ul className="mt-2">
              {foodData.map((food, index) => (
                <motion.li 
                  key={food.id} 
                  className="text-blue-500 cursor-pointer hover:underline"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleFoodImageClick(food)}
                >
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  {food.name}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Recipe Button */}
          <Button onClick={() => setShowRecipe(!showRecipe)} className="mt-4">
            {showRecipe ? "Hide Recipe" : "View Recipe"}
          </Button>

          {showRecipe && (
            <motion.div 
              className="mt-4" 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <a href="https://www.allrecipes.com/recipe/24228/sushi-roll/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Go to Recipe
              </a>
            </motion.div>
          )}

          {/* Ranked Foods */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Ranked Foods</h3>
            <ul>
              {rankedFood.length > 0 ? (
                rankedFood.map((food, index) => (
                  <motion.li key={food.id} className="text-gray-700">
                    {index + 1}. {food.name}
                  </motion.li>
                ))
              ) : (
                <p className="text-gray-500">Click food items to rank them!</p>
              )}
            </ul>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">User Comments</h3>
            <div className="mt-2">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                <motion.ul 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.3 }}
                >
                  {comments.map((comment, index) => (
                    <li key={index} className="mt-1 text-gray-700 bg-gray-100 p-2 rounded-lg">
                      {comment}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Comment Input */}
            <div className="mt-4 flex flex-col items-center">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              <Button onClick={handleAddComment} className="mt-2">Add Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
