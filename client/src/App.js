import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;