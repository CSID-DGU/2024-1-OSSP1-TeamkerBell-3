import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import { useRecoilValue } from "recoil";
import { categoryState } from "../atoms";
import MyAchievements from "../components/myPageComponents/MyAchievements";
import { getMyAchievements } from "../api/user";
import { useParams } from "react-router-dom";

const MyAchievementPage = () => {
  const categoryStateValue = useRecoilValue(categoryState);
  const { userId } = useParams();
  const [data, setData] = useState(); // 초기값 null로 설정
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      // async 함수로 변경
      try {
        console.log("userID:", userId);
        const response = await getMyAchievements(userId); // await 추가
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // 에러 처리 로직 추가 (예: 에러 메시지 표시)
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchData(); // useEffect 내에서 fetchData 호출
  }, [userId]); // userId가 변경될 때마다 다시 데이터 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {categoryStateValue === 4 &&
          (isLoading ? (
            <p>Loading...</p> // 로딩 중일 때 로딩 표시
          ) : (
            <MyAchievements data={data} /> // 데이터가 있을 때만 컴포넌트 렌더링
          ))}
      </div>
    </div>
  );
};

export default MyAchievementPage;
