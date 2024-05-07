// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import MainPage from "./pages/main";
import Header from "./components/Header";

import Team from "./pages/team";
import TeamToolW2M from "./pages/teamToolW2M";
import TeamToolGit from "./pages/teamToolGit";
import TeamToolSlack from "./pages/teamToolSlack";


import CompMatching from "./pages/comp";
import CompReviews from "./pages/reviews";
import Mypage from "./pages/mypage";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/team/tid" element={<Team />} />
        <Route
          path="/team/tid/guideline1"
          element={<TeamToolW2M />}
        />
        <Route
          path="/team/tid/guideline2"
          element={<TeamToolGit />}
        />
        <Route
          path="/team/tid/guideline3"
          element={<TeamToolSlack />}
        />


        <Route path="/comp/:compId" element={<CompMatching />} />
        <Route path="/comp/:compId/reviews" element={<CompReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
