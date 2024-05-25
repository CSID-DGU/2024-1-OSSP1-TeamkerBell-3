// 사이드바 팀원 정보 클릭 시

import React from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "./Calendar";
import styles from "./ProjectProgressing.module.css";
import GitChart from "./GitChart";

const ProjectProgressing = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>일정</h2>
      </div>
      <hr className={styles.line} />
      <div className={styles.ProjectProgressingConntainer}>
        <ReactCalendar />
      </div>
      <div className={styles.title}>
        <h2>Commit 진행</h2>
      </div>
      <hr className={styles.line} />
      <div className={styles.ProjectProgressingConntainer}>
        <GitChart />
      </div>
    </div>
  );
};

export default ProjectProgressing;

<div className={styles.main}>
  <div className={styles.title}>
    <h2>팀원 정보</h2>
  </div>
  <hr className={styles.line} />
</div>;
