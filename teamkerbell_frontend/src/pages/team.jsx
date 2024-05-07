// src/team/tid.js
import React from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms"; // recoil의 전역상태 listState 가져옴
import CoopTool from "../components/teamComponents/CoopTool";
import CntstInfo from "../components/teamComponents/CntstInfo";
import MemInfo from "../components/teamComponents/MemInfo";

const Team = () => {
  const listStateValue = useRecoilValue(listState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {listStateValue === 0 && <CoopTool />}
        {listStateValue === 1 && <CntstInfo />}
        {listStateValue === 2 && <MemInfo />}
      </div>
    </div>
  );
};

export default Team;
