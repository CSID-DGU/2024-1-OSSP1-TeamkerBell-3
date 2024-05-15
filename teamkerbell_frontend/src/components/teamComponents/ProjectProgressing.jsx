// 사이드바 팀원 정보 클릭 시

import React from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "./Calendar";
import styles from "./ProjectProgressing.module.css";
import GitChart from "./GitChart";

const ProjectProgressing = () => {
  return (
    <div className={styles.ProjectProgressingConntainer}>
      <ReactCalendar />
      <GitChart />
    </div>
  );
};

export default ProjectProgressing;
