import React from "react";
import styles from "./Potfolios.module.css";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 상태

function Portfolios({ resumes }) {
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState); // Recoil 상태와 setter 함수 불러오기

  const writePortfoliohandler = () => {
    setCategoryNum(5); // Recoil을 통해 categoryNum 상태 업데이트
    console.log("[Recoil]categoryNum :", categoryNum);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleButton}>
        <h2> 이력서 목록 </h2>
        <button onClick={writePortfoliohandler}>이력서 작성</button>
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
