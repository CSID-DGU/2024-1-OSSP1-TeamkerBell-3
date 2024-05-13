// src/team.js
import React from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import Portfolios from "../components/myPageComponents/Potfolios";
import WritePortfolio from "../components/myPageComponents/WritePotfolio";
import { useRecoilValue } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

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

const ResumesPage = () => {
  const categoryStateValue = useRecoilValue(categoryState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {categoryStateValue === 2 && <Portfolios resumes={DUMMY_Portfolio} />}
        {categoryStateValue === 5 && <WritePortfolio />}
      </div>
    </div>
  );
};

export default ResumesPage;
