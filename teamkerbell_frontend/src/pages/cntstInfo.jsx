import React, { useEffect } from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import CntstInfo from "../components/teamComponents/CntstInfo";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

const Cntstinfo = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기

  useEffect(() => {
    setCategoryState(1); // categoryState를 1로 설정
  }, [setCategoryState]); // 의존성 배열에 setCategoryState를 추가

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <CntstInfo />
        {/* categoryStateValue가 0일 때만 EditProfile을 렌더링 */}
      </div>
    </div>
  );
};

export default Cntstinfo;
