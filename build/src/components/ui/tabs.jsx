import React from "react";

export function Tabs({ children, className }) {
  return <div className={`border-b ${className}`}>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={`flex space-x-2 p-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, activeTab, onClick, children }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition ${
        activeTab === value ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? <div className="p-4">{children}</div> : null;
}
