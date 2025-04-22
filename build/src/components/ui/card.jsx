import React from "react";

// 📌 Card Component (Wrapper)
export function Card({ title, image, onClick, className = "", children }) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden cursor-pointer 
      transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95 
      ${className}`}
    >
      {/* Image Section */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-3xl"
        />
      )}

      {/* Title Section */}
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      {/* Content Section */}
      <CardContent>{children}</CardContent>

      {/* Floating Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 opacity-0 transition-opacity duration-500 hover:opacity-40"></div>
    </div>
  );
}

// 📌 Card Header
export function CardHeader({ children }) {
  return <div className="border-b p-4 font-semibold">{children}</div>;
}

// 📌 Card Title
export function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

// 📌 Card Content
export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
