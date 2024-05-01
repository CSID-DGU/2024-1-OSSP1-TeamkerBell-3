import React from "react";
import styles from "./Potfolios.module.css";
function Portfolios({ resumes }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleButton}>
        <h2> 이력서 목록 </h2>
        <button>이력서 작성</button>
      </div>

      <div className={styles.resumeContainer}>
        {resumes.map((resume, index) => (
          <div className={styles.resumeItem} key={index}>
            <h2>{resume.title}</h2>
            <p>{resume.content}</p>
            <h3 className={styles.greenColor}>Details:</h3>
            <ul>
              <li>
                <span className={styles.label}>이름:</span>{" "}
                <span>{resume.name}</span>
              </li>
              <li>
                <span className={styles.label}>나이:</span>{" "}
                <span>{resume.age}</span>
              </li>
              <li>
                <span className={styles.label}>설명:</span>{" "}
                <span>{resume.occupation}</span>
              </li>
              <li>
                <span className={styles.label}>기술:</span>{" "}
                <span>{resume.skills}</span>
              </li>
              <li>
                <span className={styles.label}>백준 티어:</span>{" "}
                <span>{resume.baekjoonTier}</span>
              </li>
              <li>
                <span className={styles.label}>Github:</span>{" "}
                <span>{resume.github}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolios;
