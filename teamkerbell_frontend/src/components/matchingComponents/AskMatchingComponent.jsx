import React, { useState } from "react";
import styles from "./AskMatchingComponent.module.css";

const AskMatching = () => {
  const [isRandomMatching, setIsRandomMatching] = useState(false); // 초기값 설정
  const handleRandomMatching = () => {
    // 랜덤 매칭 처리
    setIsRandomMatching(false);
  };
  const handleSelectMatching = () => {
    // 랜덤 매칭 처리
    setIsRandomMatching(true);
  };
  return (
    <div className={styles.askMatchingContainer}>
      <hr className={styles.line}></hr>
      <div className={styles.matchingContent}>
        <p className={styles.matchingQuestion}>
          해당 공모전을 함께할 팀원을 찾으시나요?
        </p>
        <p className={styles.nowMatching}>12명이 팀을 찾고 있어요!</p>
      </div>

      <div className={styles.matchingButtons}>
        <button
          onClick={handleRandomMatching}
          className={
            isRandomMatching
              ? styles.matchingButton
              : styles.matchingButtonActive
          }
        >
          랜덤 매칭
        </button>
        <button
          onClick={handleSelectMatching}
          className={
            isRandomMatching
              ? styles.matchingButtonActive
              : styles.matchingButton
          }
        >
          선택 매칭
        </button>
      </div>
      <div className={styles.matchingMethodDescription}>
        {isRandomMatching ? (
          <img src="../../../selectMatchingMethod.png" />
        ) : (
          <img src="../../../randomMatchingMethod.png" />
        )}
      </div>
    </div>
  );
};

export default AskMatching;
