// src/team.js
import React from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";

import { useRecoilValue } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

import MyAchievements from "../components/myPageComponents/MyAchievements";

const MyAchievementPage = () => {
  const categoryStateValue = useRecoilValue(categoryState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {categoryStateValue === 4 && <MyAchievements />}
      </div>
    </div>
  );
};

export default MyAchievementPage;
