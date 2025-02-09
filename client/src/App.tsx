import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import { LandingPage, Login, Profile } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}