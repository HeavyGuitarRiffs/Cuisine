import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";// Ensure correct path

const DropdownMenuContext = React.createContext();

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
  return (
    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
      {children}
    </button>
  );
};

const DropdownMenuContent = ({ children }) => {
  const { isOpen } = React.useContext(DropdownMenuContext);
  return isOpen ? (
    <div className="absolute right-0 bg-white shadow-lg rounded-md p-2 mt-2 z-50">
      {children}
    </div>
  ) : null;
};

const DropdownMenuItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-2 cursor-pointer hover:bg-gray-100 rounded-md"
  >
    {children}
  </button>
);

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
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/leaderboard")}>Leaderboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, UserDropdownMenu };
export default UserDropdownMenu;
