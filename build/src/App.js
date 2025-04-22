import React, { useEffect, useState, useCallback, useMemo } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "./components/Navbar"; 
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PricingPage from "./pages/PricingPage";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import CategorySelector from "./components/CategorySelector";
import CategoryPage from "./pages/CategoryPage"; 
import Settings from "./pages/Settings";
import RankingGame from "./pages/RankingGame";
import ComparisonGame from "./pages/ComparisonGame";
import GamePage from "./pages/GamePage";
import "./App.css";
import "swiper/css";
import "./index.css"; 
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    document.title = "Zition";
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }, []);

  const isGamePage = useMemo(() => location.pathname.startsWith("/game/"), [location.pathname]);

  return (
    <div className="App font-sans">
      {/* Navbar appears on all pages except game pages */}
      {!isGamePage && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategorySelector />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} /> 
        <Route path="/game/:category" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/ranking-game" element={<RankingGame />} />
        <Route path="/comparison-game" element={<ComparisonGame />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* ✅ Add Leaderboard Route */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </DndProvider>
      {!isGamePage && (
        <footer className="App-footer text-center mt-12 p-6">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 hover:text-blue-800 transition duration-300 text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400 hover:text-blue-600 transition duration-300 text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-600 hover:text-pink-800 transition duration-300 text-2xl" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 hover:text-blue-900 transition duration-300 text-2xl" />
              </a>
            </li>
          </ul>
        </footer>
      )}
    </div> 
  );
};

export default App;
