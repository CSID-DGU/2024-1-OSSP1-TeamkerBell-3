// src/team.js
import React from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import WritePortfolio from "../components/myPageComponents/WritePotfolio";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

const ResumeMakingPage = () => {
  const localStorageUserId = localStorage.getItem("userId"); // localStorage에서 userId 가져옴
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState);
  setCategoryNum(2);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>{<WritePortfolio />}</div>
    </div>
  );
};

export default ResumeMakingPage;
