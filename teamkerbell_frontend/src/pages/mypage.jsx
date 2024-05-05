// src/team.js
import React from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import EditProfile from "../components/myPageComponents/EditProfile";
import Portfolios from "../components/myPageComponents/Potfolios";
import WritePortfolio from "../components/myPageComponents/WritePotfolio";
import FavoriteComp from "../components/myPageComponents/FavoriteComp";
import ManageProject from "../components/myPageComponents/ManageProject";
import { useRecoilValue } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태
import LookingUpResume from "../components/myPageComponents/LookingUpResume";

const DUMMY_Portfolio = [
  {
    temperature: 42.5,
    title: "규진's 이력서",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "홍규진",
    age: 24,
    occupation: "프론트엔드 개발/백엔드 개발",
    skills: "JavaScript, React, Django, Flutter",
    baekjoonTier: "Gold",
    github: "github.com/kyujenius",
    tags: [0, 1, 2, 3],
  },
  {
    temperature: 42.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [0, 1, 2],
  },
  {
    temperature: 31.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [0, 3],
  },
  {
    temperature: 39.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [],
  },
];

const DUMMY_COMP = [
  {
    id: 0,
    image: "../../comp_example.jpeg",
    title: "생성형 AI 이미지 활용 공모전",
    description:
      "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
    jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    deadline: new Date("2024-05-10"),
  },
  {
    id: 1,
    image: "../../comp_example.jpeg",
    title: "생성형 AI 이미지 활용 공모전",
    description:
      "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
    jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    deadline: new Date("2024-06-15"),
  },
  {
    id: 2,
    image: "../../comp_example.jpeg",
    title: "생성형 AI 이미지 활용 공모전",
    description:
      "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
    jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    deadline: new Date("2024-07-20"),
  },
  {
    id: 3,
    image: "../../comp_example.jpeg",
    title: "생성형 AI 이미지 활용 공모전",
    description:
      "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
    jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    deadline: new Date("2024-07-20"),
  },
  // 필요한 만큼 데이터를 추가할 수 있음
];
const DUMMY_PROGRESSING_PROJECTS = [
  {
    projectName: "프로젝트 1",
    matchingType: "선택 매칭",
    matchingTime: "2024-05-02 10:00",
    teamMember: 5,
  },
];

const DUMMY_RECRUITING_PROJECTS = [
  {
    projectName: "프로젝트 2",
    matchingType: "선택 매칭",
    matchingTime: "2024-05-03 14:00",
    teamMember: 3,
  },
];
const DUMMY_APPLYING_PROJECTS = [
  {
    projectName: "프로젝트 3",
    matchingType: "랜덤 매칭",
    matchingTime: "2024-05-04 16:00",
    teamMember: 4,
  },
];

const Mypage = () => {
  const categoryStateValue = useRecoilValue(categoryState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {categoryStateValue === 0 && <EditProfile />}
        {categoryStateValue === 1 && <FavoriteComp comps={DUMMY_COMP} />}
        {categoryStateValue === 2 && <Portfolios resumes={DUMMY_Portfolio} />}
        {categoryStateValue === 3 && (
          <ManageProject
            progressingProjcets={DUMMY_PROGRESSING_PROJECTS}
            recruitingProjects={DUMMY_RECRUITING_PROJECTS}
            applyingProjects={DUMMY_APPLYING_PROJECTS}
          />
        )}
        {categoryStateValue === 5 && <WritePortfolio />}
        {categoryStateValue === 6 && (
          <LookingUpResume
            recruitingProjects={DUMMY_RECRUITING_PROJECTS}
            resumes={DUMMY_Portfolio}
          />
        )}
      </div>
    </div>
  );
};

export default Mypage;
