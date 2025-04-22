import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Import sound effects
const levelUpSound = new Audio("/sounds/level-up.mp3");
const foodSelectSound = new Audio("/sounds/food-select.mp3");
const achievementSound = new Audio("/sounds/achievement.mp3");

const badges = [
  { name: "First Bite", threshold: 1, icon: "🥄" },
  { name: "Food Explorer", threshold: 5, icon: "🍽️" },
  { name: "Top Chef", threshold: 20, icon: "👨‍🍳" },
  { name: "Food Connoisseur", threshold: 40, icon: "🍷" },
  { name: "Ultimate Foodie", threshold: 100, icon: "🏆" },
];

const initialPlayers = [
  { name: "Alice", food: "Pizza", rank: 1, score: 80, image: "/avatars/alice.png", dishesRanked: 0, unlockedBadges: [] },
  { name: "Bob", food: "Sushi", rank: 2, score: 72, image: "/avatars/bob.png", dishesRanked: 0, unlockedBadges: [] },
  { name: "Charlie", food: "Burger", rank: 3, score: 65, image: "/avatars/charlie.png", dishesRanked: 0, unlockedBadges: [] },
];

export default function PlayerRanking() {
  const { width, height } = useWindowSize();
  const [players, setPlayers] = useState(initialPlayers);
  const [maxRanked, setMaxRanked] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          const newScore = Math.min(100, player.score + Math.random() * 5);

          if (newScore > player.score) {
            foodSelectSound.play();
          }

          let newDishesRanked = player.dishesRanked + (Math.random() > 0.5 ? 1 : 0);
          let newBadges = [...player.unlockedBadges];

          badges.forEach((badge) => {
            if (newDishesRanked >= badge.threshold && !newBadges.includes(badge.name)) {
              newBadges.push(badge.name);
              achievementSound.play();
              setNewBadge({ player: player.name, badge });
            }
          });

          if (newScore === 100 && !maxRanked) {
            setMaxRanked(true);
          }

          return { ...player, score: newScore, dishesRanked: newDishesRanked, unlockedBadges: newBadges };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [maxRanked]);

  return (
    <div className="p-6 space-y-4 relative">
      {maxRanked && <Confetti width={width} height={height} numberOfPieces={300} />}

      {players.map((player) => (
        <motion.div key={player.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="shadow-md transition-all duration-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={player.image} />
                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold">{player.name}</CardTitle>
                <p className="text-sm text-gray-500">{player.food}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm font-medium">
                <span>Rank: #{player.rank}</span>
                <span>Score: {Math.round(player.score)}</span>
              </div>
              <Progress value={player.score} className="mt-2" />
              <div className="mt-2 text-sm">
                <p>Dishes Ranked: {player.dishesRanked}</p>
                <p>Badges: {player.unlockedBadges.map((b) => `🏅 ${b}`).join(", ") || "None yet"}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Achievement Notification */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-yellow-300 p-4 rounded-lg shadow-lg text-black text-lg font-bold flex items-center gap-2"
          >
            {newBadge.badge.icon} {newBadge.player} unlocked **{newBadge.badge.name}**!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
