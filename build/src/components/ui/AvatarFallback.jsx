import React from "react";

const AvatarFallback = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-200">
    {children}
  </div>
);

export default AvatarFallback;
