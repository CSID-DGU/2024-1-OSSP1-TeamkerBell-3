import React from "react";
import styles from "./ResumeSummary.module.css";



const ResumeSummary = ({content}) => {
  return (
    <div className={styles.main}>
      
        <div className={styles.box}>
          <div className={styles.boxleft}>
            <img className={styles.memImg} src={content.img} />
            <div className={styles.baseInfo}>
              <h3 className={styles.name}>{content.name}</h3>
              <div className={styles.info}>
                {content.age} / {content.gender}
              </div>
            </div>
          </div>

          <div className={styles.boxright}>
            <ul className={styles.boxdescrip}>
              <li>
                <strong>역할: </strong>
                {content.role.team}/{content.role.department}
              </li>
              <li>
                <strong>기술 스택: </strong>
                {content.stack}
              </li>
              <li>
                <strong>이메일: </strong>
                {content.email}
              </li>
              
              <li>
                <strong>백준 티어: </strong>
                {content.tier}
              </li>
            </ul>
          </div>
        </div>
      
    </div>
  );
};

export default ResumeSummary;
