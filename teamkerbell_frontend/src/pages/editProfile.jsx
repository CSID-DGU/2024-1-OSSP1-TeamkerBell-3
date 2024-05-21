// src/team.js
import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import EditProfile from "../components/myPageComponents/EditProfile";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태
import { getUserProfile } from "../api/user";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams(); // useParams에서 userId를 추출

  useEffect(() => {
    setCategoryState(0); // categoryState를 0으로 설정

    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(userId);
        setData(userProfile);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setCategoryState, userId]); // 의존성 배열에 setCategoryState와 userId를 추가

  const categoryStateValue = useRecoilValue(categoryState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {categoryStateValue === 0 && !isLoading && (
          <EditProfile
            initialNickname={data.nickname}
            initialEmail={data.email}
            initialPhoneNumber={data.phoneNumber}
          />
        )}
        {/* categoryStateValue가 0이고 isLoading이 false일 때만 EditProfile을 렌더링 */}
      </div>
    </div>
  );
};

export default EditProfilePage;
