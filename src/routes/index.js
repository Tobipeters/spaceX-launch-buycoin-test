import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
