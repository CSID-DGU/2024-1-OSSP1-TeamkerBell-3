// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import MainPage from "./pages/main";
import Header from "./components/Header";

import Team from "./pages/team";
import Team_Tool from "./pages/team_tool";
import Teampage_Tool_detail1 from "./pages/team_tool_op1";
import CompMatching from "./pages/compmatching";
import CompReviews from "./pages/reviews";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/option1" element={<Team_Tool />} />
        <Route
          path="/team/option1/detail1"
          element={<Teampage_Tool_detail1 />}
        />
        <Route path="/compmatching" element={<CompMatching />} />
        <Route path="/compmatching/reviews" element={<CompReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
