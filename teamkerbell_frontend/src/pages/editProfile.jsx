// src/team.js
import React, { useEffect } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import EditProfile from "../components/myPageComponents/EditProfile";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

const EditProfilePage = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기

  useEffect(() => {
    setCategoryState(0); // categoryState를 1로 설정
  }, [setCategoryState]); // 의존성 배열에 setCategoryState를 추가

  const categoryStateValue = useRecoilValue(categoryState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {categoryStateValue === 0 && <EditProfile />}
        {/* categoryStateValue가 0일 때만 EditProfile을 렌더링 */}
      </div>
    </div>
  );
};

export default EditProfilePage;
