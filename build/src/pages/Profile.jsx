import React, { useState } from "react";
import PlayerProfile from "../components/PlayerProfile";
import ProfilePage from "../components/ProfilePage";
import { 
  Utensils, Wine, ChefHat, UtensilsCrossed, GlassWater, Sandwich, Scroll, 
  Leaf, Badge, Crown, Trophy, ShieldCheck, Users,
} from "lucide-react";

const Profile = () => {
  const [stats, setStats] = useState({
    dishesRanked: 100,
    favoriteDish: "Sushi",
    favoriteDrink: "Matcha Latte",
    country: "Japan",
    favoriteCuisine: "Japanese",
    favoriteCountry: "Italy",
    customField: "Loves Spicy Food",
  });

  const badges = [
    "First Dish", "First Drink", "Leftovers", "Foodie", "Deli Counter",
    "Line Cook", "Prep Cook", "Waiter", "Nutritionist", "Buffet Regular",
    "Gourmet Explorer", "Sommelier", "Maitre D", "Connoisseur", 
    "Friend of a Chef", "Cheat Meals", "Banquet", "Top Chef", "Master Chef"
  ];

  const badgeIcons = {
    "First Dish": <UtensilsCrossed className="w-5 h-5 text-yellow-500" />, // First game played
    "First Drink": <GlassWater className="w-5 h-5 text-blue-500" />, // Ranked in the drinks section
    "Leftovers": <Utensils className="w-5 h-5 text-gray-500" />, // 2nd, 3rd, 4th dishes ranked
    "Foodie": <Sandwich className="w-5 h-5 text-red-500" />, // 5 dishes ranked
    "Deli Counter": <Sandwich className="w-5 h-5 text-orange-500" />, // 10 sandwiches ranked
    "Line Cook": <ChefHat className="w-5 h-5 text-green-500" />, // 20 dishes served
    "Prep Cook": <Scroll className="w-5 h-5 text-purple-500" />, // 30 dishes cooked
    "Waiter": <Users className="w-5 h-5 text-blue-700" />, // 100 dishes seen and ranked
    "Nutritionist": <Leaf className="w-5 h-5 text-green-700" />, // 100 healthy dishes seen and ranked
    "Buffet Regular": <Utensils className="w-5 h-5 text-yellow-500" />, // 200 dishes seen and ranked
    "Gourmet Explorer": <Crown className="w-5 h-5 text-orange-500" />, // 300 cultural dishes seen and ranked
    "Sommelier": <Wine className="w-5 h-5 text-red-600" />, // 100 wines ranked
    "Maitre D": <ChefHat className="w-5 h-5 text-gray-700" />, // 400 cultural dishes seen and ranked
    "Connoisseur": <ShieldCheck className="w-5 h-5 text-indigo-500" />, // 500 dishes seen and ranked
    "Friend of a Chef": <Users className="w-5 h-5 text-gray-700" />, // 600 dishes seen and ranked
    "Cheat Meals": <Trophy className="w-5 h-5 text-yellow-500" />, // 700 dishes seen and earned
    "Banquet": <Trophy className="w-5 h-5 text-yellow-600" />, // 800 dishes seen and ranked
    "Top Chef": <Crown className="w-5 h-5 text-blue-600" />, // 900 dishes seen and ranked
    "Master Chef": <ShieldCheck className="w-5 h-5 text-green-600" />, // 1000 dishes seen and ranked
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h1 className="text-2xl font-bold">Player Profile</h1>
      
      {/* Avatar Upload & Save */}
      <PlayerProfile />

      {/* Player Stats & Badges */}
      <ProfilePage stats={stats} badges={badges} badgeIcons={badgeIcons} />
    </div>
  );
};

export default Profile;
