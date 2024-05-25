import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import EditProfile from "../components/myPageComponents/EditProfile";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import { getUserProfile } from "../api/user";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const setCategoryState = useSetRecoilState(categoryState);
  const [data, setData] = useState(null); // 초기값 null로 설정
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  const { userId } = useParams();

  useEffect(() => {
    setCategoryState(0);

    const fetchData = async () => {
      try {
        const response = await getUserProfile(userId);
        setData(response.data); // await 제거
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError(error); // 에러 상태 설정
      } finally {
        setIsLoading(false); // await 제거
      }
    };
    fetchData();
  }, [setCategoryState, userId]);

  const categoryStateValue = useRecoilValue(categoryState);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading profile: {error.message}</div>
        ) : (
          <EditProfile data={data} />
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
