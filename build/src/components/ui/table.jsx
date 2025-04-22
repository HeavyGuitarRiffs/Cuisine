import React from "react";

export function Table({ children }) {
  return <table className="w-full border-collapse border">{children}</table>;
}

export function TableRow({ children }) {
  return <tr className="border">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="border px-4 py-2">{children}</td>;
}

export function TableHeaderCell({ children }) {
  return <th className="border px-4 py-2 text-left">{children}</th>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableHeader({ children }) {
  return <thead>{children}</thead>;
}


