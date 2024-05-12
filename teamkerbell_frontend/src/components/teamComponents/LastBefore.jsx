// 사이드바 마무리 클릭시 종료 전
import React from "react";
import styles from "./LastBefore.module.css";

const LastBefore = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>마무리</h2>

      <hr className={styles.line} />

      <h4 className={styles.text}>
        아직 프로젝트가 종료되지 않아 상호평가를 할 수 없습니다.
      </h4>
    </div>
  );
};

export default LastBefore;
