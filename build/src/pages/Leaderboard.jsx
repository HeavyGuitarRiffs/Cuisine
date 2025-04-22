import { useState } from "react";
import { Table, TableRow, TableCell, TableHeaderCell, TableBody, TableHeader } from "../components/ui/table";
import Button from "../components/ui/button";
import { ArrowUpDown } from "lucide-react";


// Mock Data
const players = [
  { name: "Alex", score: 1500, gamesPlayed: 50, category: "Desserts", country: "USA" },
  { name: "Jamie", score: 2100, gamesPlayed: 75, category: "Seafood", country: "Canada" },
  { name: "Taylor", score: 1800, gamesPlayed: 65, category: "Fast Food", country: "UK" },
  { name: "Chris", score: 2500, gamesPlayed: 90, category: "Sushi", country: "Japan" },
];

const favoriteDishes = [
  { dish: "Pizza", category: "Fast Food", votes: 3200 },
  { dish: "Sushi", category: "Sushi", votes: 2800 },
  { dish: "Ice Cream", category: "Desserts", votes: 2500 },
  { dish: "Lobster", category: "Seafood", votes: 2000 },
];

const categories = [...new Set(players.map(p => p.category))];
const countries = [...new Set(players.map(p => p.country))];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [sortKey, setSortKey] = useState("score");
  const [ascending, setAscending] = useState(false);

  const sortedPlayers = [...players].sort((a, b) => (ascending ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]));

  const handleSort = (key) => {
    setSortKey(key);
    setAscending(sortKey === key ? !ascending : true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-4 text-center">🏆 Leaderboard</h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button variant="outline" onClick={() => setActiveTab("global")} className={activeTab === "global" ? "bg-gray-200" : ""}>Global</Button>
        <Button variant="outline" onClick={() => setActiveTab("category")} className={activeTab === "category" ? "bg-gray-200" : ""}>By Category</Button>
        <Button variant="outline" onClick={() => setActiveTab("country")} className={activeTab === "country" ? "bg-gray-200" : ""}>By Country</Button>
        <Button variant="outline" onClick={() => setActiveTab("dishes")} className={activeTab === "dishes" ? "bg-gray-200" : ""}>Top Dishes</Button>
      </div>

      {/* Leaderboard Tables */}
      {activeTab === "global" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Player</TableHeaderCell>
              <TableHeaderCell>
                <Button variant="ghost" onClick={() => handleSort("score")}> Score <ArrowUpDown size={16} /> </Button>
              </TableHeaderCell>
              <TableHeaderCell>
                <Button variant="ghost" onClick={() => handleSort("gamesPlayed")}> Games Played <ArrowUpDown size={16} /> </Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.score}</TableCell>
                <TableCell>{player.gamesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {activeTab === "category" && categories.map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mt-4">{category} 🏅</h2>
          <Table>
            <TableBody>
              {sortedPlayers.filter(p => p.category === category).map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                  <TableCell>{player.gamesPlayed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      {activeTab === "country" && countries.map((country) => (
        <div key={country} className="mb-6">
          <h2 className="text-xl font-semibold mt-4">{country} 🌍</h2>
          <Table>
            <TableBody>
              {sortedPlayers.filter(p => p.country === country).map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                  <TableCell>{player.gamesPlayed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      {activeTab === "dishes" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Dish</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>
                <Button variant="ghost" onClick={() => handleSort("votes")}> Votes <ArrowUpDown size={16} /> </Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...favoriteDishes].sort((a, b) => (ascending ? a.votes - b.votes : b.votes - a.votes)).map((dish, index) => (
              <TableRow key={index}>
                <TableCell>{dish.dish}</TableCell>
                <TableCell>{dish.category}</TableCell>
                <TableCell>{dish.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Leaderboard;
