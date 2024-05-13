// src/team/tid.js
import React from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms"; // recoil의 전역상태 listState 가져옴
import CoopTool from "../components/teamComponents/CoopTool";
import CntstInfo from "../components/teamComponents/CntstInfo";
import MemInfo from "../components/teamComponents/MemInfo";
import ProjectProgressing from "../components/teamComponents/ProjectProgressing";
import LastBefore from "../components/teamComponents/LastBefore";
import LastAfter from "../components/teamComponents/LastAfter";
import EndKick from "../components/teamComponents/EndKick";
import EndRun from "../components/teamComponents/EndRun";

const Team = () => {
  const listStateValue = useRecoilValue(listState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/*사이드바 State 값에 따라 컴포넌트 렌더링*/}
        {listStateValue === 0 && <CoopTool />}
        {listStateValue === 1 && <CntstInfo />}
        {listStateValue === 2 && <MemInfo />}
        {listStateValue === 3 && <ProjectProgressing />}
        {listStateValue === 4 && (End() ? <LastAfter /> : <LastBefore />)}
        {/*End함수의 리턴값에 따라 프로젝트 종료 여부 확인 및 그에 따른 컴포넌트 렌더링*/}

        {listStateValue === 6 && (Run() ? <EndRun /> : <EndKick />)}
      </div>
    </div>
  );
};

export default Team;

const End = () => {
  return true;
};

const Run = () => {
  return false;
};
