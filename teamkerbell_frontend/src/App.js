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
import TeamDetail from "./pages/teamdetail";
import TeamApply from "./pages/teamapply";
import LeaderResume from "./pages/leaderresume";
import CreateTeam from "./pages/createteam";
import CompLikedPage from "./pages/compLiked";
import EditProfilePage from "./pages/editProfile";
import ResumesPage from "./pages/resumes";
import MyAchievementPage from "./pages/myAchieve";
import ProjectsPage from "./pages/projects";
import ResumeMakingPage from "./pages/resumeMaking";
import CompRegister from "./pages/compRegister";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/compregister" element={<CompRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/user/:userId/mypage/editProfile"
          element={<EditProfilePage />}
        />
        <Route
          path="/user/:userId/mypage/compLiked"
          element={<CompLikedPage />}
        />
        <Route path="/user/:userId/mypage/resumes" element={<ResumesPage />} />
        <Route
          path="/user/:userId/mypage/resumeMaking"
          element={<ResumeMakingPage />}
        />

        <Route
          path="/user/:userId/mypage/resumes/:resumeId"
          element={<ResumesPage />}
        />

        <Route
          path="/user/:user_id/mypage/projects"
          element={<ProjectsPage />}
        />
        <Route
          path="/user/:user_id/mypage/myAchieve"
          element={<MyAchievementPage />}
        />

        {/* 이력서 수정 페이지로 수정 필요 */}
        <Route
          path="/mypage/user/:userId/resume/:resumeId"
          element={<Mypage />}
        />

        <Route path="/team/tid" element={<Team />} />
        <Route path="/team/tid/guideline1" element={<TeamToolW2M />} />
        <Route path="/team/tid/guideline2" element={<TeamToolGit />} />
        <Route path="/team/tid/guideline3" element={<TeamToolSlack />} />

        <Route path="/comp/:compId" element={<CompMatching />} />
        <Route path="/comp/:compId/reviews" element={<CompReviews />} />
        <Route
          path="/comp/:compId/teamList/:teamId/detail"
          element={<TeamDetail />}
        />
        <Route
          path="/comp/:compId/teamList/:teamId/apply"
          element={<TeamApply />}
        />
        <Route
          path="/comp/:compId/teamList/:teamId/leaderResume"
          element={<LeaderResume />}
        />
        <Route path="/comp/:compId/createTeam" element={<CreateTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
