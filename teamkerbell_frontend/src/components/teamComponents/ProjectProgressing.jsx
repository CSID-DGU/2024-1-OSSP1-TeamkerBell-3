// 사이드바 팀원 정보 클릭 시

import React from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "./Calendar";
import styles from "./ProjectProgressing.module.css";

const ProjectProgressing = () => {
  return (
    <div className={styles.ProjectProgressingConntainer}>
      <ReactCalendar />
    </div>
  );
};

export default ProjectProgressing;
