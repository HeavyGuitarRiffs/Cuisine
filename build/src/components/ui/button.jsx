import React from "react";

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      className={`px-8 py-4 text-2xl font-bold text-white rounded-3xl shadow-lg transition-all duration-300 ease-in-out 
      bg-gradient-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 
      transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
