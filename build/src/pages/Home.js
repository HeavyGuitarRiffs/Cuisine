import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "../components/ui/dropdown-menu";
import logo from "../logo.svg";
import "./Home.css";

// Navbar Component
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-bold">C\/|$|N3</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>^</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md">
          <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/leaderboard")}>Leaderboard</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => { 
              console.log("Logging out..."); 
              navigate("/"); 
            }} 
            className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

// Home Page Component
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative font-sans flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 bg-food-animation"></div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Content Section */}
      <div className="relative z-10 p-6 mt-20">
        {/* Header Section */}
        <header className="mb-8">
          <img src={logo} className="w-32 h-32 mb-4 animate-pulse" alt="Cuisine Logo" />
          <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg animate-bounce">
            Cuisine 🍽️
          </h1>
          <p className="text-lg text-white mt-2">
            Rank your favorite foods from around the world!
          </p>
        </header>

        {/* Navigation Buttons */}
        <div className="text-3xl space-y-4">
          <button
            onClick={() => navigate("/categories")}
            className="bg-yellow-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-yellow-600 hover:scale-105 transition-all shadow-lg">
            Choose a Category 🏆
          </button>

          <button
            onClick={() => navigate("/categories", { state: { next: "/ranking-game" } })}
            className="bg-red-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-red-600 hover:scale-105 transition-all shadow-lg">
            Play the Ranking Game 🎮
          </button>

          <button
            onClick={() => navigate("/categories", { state: { next: "/comparison" } })}
            className="bg-green-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-green-600 hover:scale-105 transition-all shadow-lg">
            Try the Comparison Game 🍕 vs 🍣
          </button>

          <button
            onClick={() => navigate("/about")}
            className="bg-blue-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:scale-105 transition-all shadow-lg">
            Learn More ℹ️
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Cuisine - The Food Ranking Game. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
