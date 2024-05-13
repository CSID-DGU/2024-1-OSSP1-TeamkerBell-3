import React from "react";
import styles from "./Potfolios.module.css";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 상태
import Resume from "./Resume";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

function Portfolios({ resumes }) {
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState); // Recoil 상태와 setter 함수 불러오기
  const navigate = useNavigate(); // useNavigate를 호출하여 navigate 함수를 생성

  const writePortfoliohandler = () => {
    setCategoryNum(5); // Recoil을 통해 categoryNum 상태 업데이트
    console.log("[Recoil]categoryNum :", categoryNum);
    navigate("/user/0/mypage/resumeMaking"); // navigate 함수를 사용하여 페이지 이동
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleButton}>
        <h2> 이력서 목록 </h2>
        <button onClick={writePortfoliohandler}>이력서 작성</button>
      </div>

      <div className={styles.resumeContainer}>
        {resumes.map((resume, index) => (
          <Resume key={index} resume={resume} />
        ))}
      </div>
    </div>
  );
}

export default Portfolios;
