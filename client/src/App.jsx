import { useState, useEffect } from "react";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Hero } from "./components/Hero";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage when the app mounts
    const token = localStorage.getItem("token");
    setToken(token);
  }, []); // Empty array ensures this only runs once when the app mounts

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Hero />} />
        {/* Check for token directly here */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
