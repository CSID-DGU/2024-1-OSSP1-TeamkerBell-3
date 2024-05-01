// src/team.js
import React from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import EditProfile from "../components/myPageComponents/EditProfile";
import Portfolios from "../components/myPageComponents/Potfolios";
import WritePotfolio from "../components/myPageComponents/WritePotfolio";

const DUMMY_Portfolio = [
  {
    title: "규진's 이력서",
    content: "풀스택 1년차 개발자",
    name: "홍규진",
    age: 24,
    occupation: "프론트엔드 개발/백엔드 개발",
    skills: "JavaScript, React, Django, Flutter",
    baekjoonTier: "Gold",
    github: "github.com/kyujenius",
  },
  {
    title: "Jane's Resume",
    content: "Web Developer with expertise in frontend technologies.",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
  },
  {
    title: "Jane's Resume",
    content: "Web Developer with expertise in frontend technologies.",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
  },
  {
    title: "Jane's Resume",
    content: "Web Developer with expertise in frontend technologies.",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
  },
];

const Mypage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <WritePotfolio />
      </div>
    </div>
  );
};

export default Mypage;
