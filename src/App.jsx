// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Listings from "./components/Listings";
import Home from "./components/Home";
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to Hexatrade</h1>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
