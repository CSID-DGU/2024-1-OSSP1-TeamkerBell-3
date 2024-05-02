// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import MainPage from "./pages/main";
import Header from "./components/Header";

import Team from "./pages/team";
import TeamTool from "./pages/teamTool";
import Teampage_Tool_detail1 from "./pages/team_tool_op1";
import Teampage_Tool_detail2 from "./pages/team_tool_op2";
import Teampage_Tool_detail3 from "./pages/team_tool_op3";
import ContestInfo from "./pages/contestInfo";


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
        <Route path="/team" element={<Team />} />
        <Route path="/team/option1" element={<TeamTool />} />
        <Route
          path="/team/option1/detail1"
          element={<Teampage_Tool_detail1 />}
        />
        <Route
          path="/team/option1/detail2"
          element={<Teampage_Tool_detail2 />}
        />
        <Route
          path="/team/option1/detail3"
          element={<Teampage_Tool_detail3 />}
        />
        <Route
          path="/team/option2"
          element={<ContestInfo />}
        />

        <Route path="/comp/:compId" element={<CompMatching />} />
        <Route path="/comp/:compId/reviews" element={<CompReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
