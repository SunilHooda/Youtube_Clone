import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Watch from "./Watch";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watch/:id" element={<Watch />} />
    </Routes>
  );
};

export default MainRoutes;
