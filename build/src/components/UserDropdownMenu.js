import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"; 

const UserDropdownMenu = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md">
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/leaderboard")}>Leaderboard</DropdownMenuItem> {/* ✅ Navigate to Leaderboard */}
        <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
