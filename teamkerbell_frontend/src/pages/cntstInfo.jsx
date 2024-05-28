import React, { useEffect, useState } from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import CntstInfo from "../components/teamComponents/CntstInfo";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import { useParams } from "react-router-dom";
import { getTeamCompDetail } from "../api/team";
import ErrorComponent from "../components/ErrorComponent"; // 에러 컴포넌트 추가

const Cntstinfo = () => {
  const setCategoryState = useSetRecoilState(categoryState);
  const { tid } = useParams();
  const [compinfo, setCompInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCompInfo = async () => {
      setCategoryState(1);
      setIsLoading(true);

      try {
        const response = await getTeamCompDetail(tid);
        console.log("[response]:", response);
        setCompInfo(response.data);
      } catch (error) {
        setIsError(true);
        setErrorMessage("공모전 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching team comp detail: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompInfo();
  }, [tid, setCategoryState]);

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
          <CntstInfo compinfo={compinfo} />
        )}
      </div>
    </div>
  );
};

export default Cntstinfo;
