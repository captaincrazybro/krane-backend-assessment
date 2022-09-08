import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LandingPage, Profile, verifyLogin } from "./pages";

export default function App() {
  // TODO: Run verifyLogin
  verifyLogin();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}