import React, { useEffect, useState } from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import MemInfo from "../components/teamComponents/MemInfo";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태
import { useParams } from "react-router-dom";
import { getTeamMemInfo } from "../api/team";
import ErrorComponent from "../components/ErrorComponent"; // 에러 컴포넌트 추가

const Meminfo = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기
  const { tid } = useParams();
  const [meminfo, setMemInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMemInfo = async () => {
      setCategoryState(1);
      setIsLoading(true);

      try {
        const response = await getTeamMemInfo(tid);
        console.log("[response]:", response);
        setMemInfo(response.data);
      } catch (error) {
        setIsError(true);
        setErrorMessage("멤버 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching team comp detail: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemInfo();
  }, [tid, setCategoryState]); // 의존성 배열에 setCategoryState를 추가

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {isLoading ? (
          <div>Loading...</div> // 로딩 중 표시
        ) : isError ? (
          <ErrorComponent message={errorMessage} /> // 에러 발생 시 표시
        ) : (
          <MemInfo meminfo={meminfo} />
        )}
      </div>
    </div>
  );
};

export default Meminfo;
