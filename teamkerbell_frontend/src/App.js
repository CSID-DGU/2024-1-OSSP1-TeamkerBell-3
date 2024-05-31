// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import MainPage from "./pages/main";
import Header from "./components/Header";

import Team from "./pages/team";
import Tools from "./pages/coopTool";
import TeamToolW2M from "./pages/teamToolW2M";
import TeamToolGit from "./pages/teamToolGit";
import TeamToolSlack from "./pages/teamToolSlack";
import CompInfo from "./pages/cntstInfo";
import MemInfo from "./pages/memInfo";
import Progress from "./pages/progress";
import Evaluation from "./pages/evaluation";
import Report from "./pages/report";
import TeamManage from "./pages/teamManage";

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
import BtnUpload from "./pages/uploadImage";
import LookingUpResumePage from "./pages/lookingUpResume";
import ApproveResumeDetailPage from "./pages/approveResumeDetail";
import FindAllTeam from "./pages/findingteam";
import TeamkerBellIntro from "./pages/teamkerbellintro";

import ResumePatchingPage from "./pages/resumePatchingPage";

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
          element={<ResumePatchingPage />}
        />

        <Route
          path="/user/:userId/mypage/projects"
          element={<ProjectsPage />}
        />
        <Route
          path="/user/:userId/mypage/team/:tid/resume/:resumeId"
          element={<ApproveResumeDetailPage />}
        />
        <Route
          path="/user/:userId/mypage/team/:tid"
          element={<LookingUpResumePage />}
        />
        <Route
          path="/user/:userId/mypage/myAchieve"
          element={<MyAchievementPage />}
        />


        {/* 이력서 수정 페이지로 수정 필요 */}
        <Route
          path="/user/:userId/resume/:resumeId"
          element={<Mypage />}
        />

        <Route
          path="/team/teamList"
          element={<FindAllTeam/>}
        />
=======
        <Route path="/team/teamList" element={<FindAllTeam />} />

        <Route
          path="/intro"
          element={<TeamkerBellIntro/>}
        />



        <Route path="/team/:tid" element={<Team />} />
        <Route path="/team/:tid/tools" element={<Tools />} />
        <Route path="/team/:tid/guidelines1" element={<TeamToolW2M />} />
        <Route path="/team/:tid/guidelines2" element={<TeamToolGit />} />
        <Route path="/team/:tid/guidelines3" element={<TeamToolSlack />} />
        <Route path="/team/:tid/compinfo" element={<CompInfo />} />
        <Route path="/team/:tid/members" element={<MemInfo />} />
        <Route path="/team/:tid/progress" element={<Progress />} />
        <Route path="/team/:tid/evaluation/end/" element={<Evaluation />} />
        <Route path="/team/:tid/report" element={<Report />} />
        <Route path="/team/:tid/teamManage" element={<TeamManage />} />

        <Route path="/comp/:compId" element={<CompMatching />} />

        <Route path="/comp/:compId/reviewList" element={<CompReviews />} />

        <Route
          path="/comp/:compId/teamList/reviewList"
          element={<CompReviews />}
        />

        <Route
          path="/comp/:compId/teamList/:teamId/detail"
          element={<TeamDetail />}
        />
        <Route
          path="/comp/:compId/teamList/:teamId/apply/:userId"
          element={<TeamApply />}
        />
        <Route
          path="/comp/:compId/teamList/:teamId/leaderResume"
          element={<LeaderResume />}
        />
        <Route
          path="/comp/:compId/createTeam/:userId"
          element={<CreateTeam />}
        />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
