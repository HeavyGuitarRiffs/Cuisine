import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockData = [
  { rank: 1, name: "Alice", food: "Pizza", score: 98, image: "/avatars/alice.png" },
  { rank: 2, name: "Bob", food: "Sushi", score: 92, image: "/avatars/bob.png" },
  { rank: 3, name: "Charlie", food: "Burger", score: 88, image: "/avatars/charlie.png" },
  { rank: 4, name: "David", food: "Pasta", score: 85, image: "/avatars/david.png" },
  { rank: 5, name: "Eve", food: "Ice Cream", score: 80, image: "/avatars/eve.png" },
];

export default function Leaderboard() {
  return (
    <div className="p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" /> Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ranking">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="ranking">Ranking</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            {/* Leaderboard Table */}
            <TabsContent value="ranking">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Favorite Food</TableHead>
                    <TableHead className="w-24 text-center">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.map((player) => (
                    <TableRow key={player.rank}>
                      <TableCell className="text-center font-bold">{player.rank}</TableCell>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={player.image} />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {player.name}
                      </TableCell>
                      <TableCell>{player.food}</TableCell>
                      <TableCell className="text-center font-semibold">{player.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Placeholder for Stats */}
            <TabsContent value="stats">
              <div className="flex flex-col items-center justify-center p-6">
                <BarChart className="w-16 h-16 text-gray-400" />
                <p className="text-gray-500 mt-2">Statistics coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
