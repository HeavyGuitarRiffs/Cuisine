import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home"; // ✅ Ensure the correct path
import "./index.css"; // ✅ TailwindCSS import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
