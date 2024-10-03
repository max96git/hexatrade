// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Listings from "./components/Listings";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to Hexatrade</h1>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/" element={<Listings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
