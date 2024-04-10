import styles from "./LeftSide.module.css";
import React from "react";

const LeftSide = ({}) => {
  const categories = [
    "협업 툴",
    "공모전 정보",
    "팀원 정보",
    "프로젝트 진행",
    "상호평가",
    "비매너 신고",
    "활동 종료",
  ];

  const DUMMY_IMAGES = [
    "../../../../logo192.png",
    "../../../../logo512.png",
    "../../../../logo512.png",
    "../../../../logo512.png",
    "../../../../logo512.png",
    "../../../../logo512.png",
    "../../../../logo192.png",
  ];

  return (
    <container className={styles.LeftSide}>
      <div className={styles.left}>
        <p className={styles.teampage}> TeamPage </p>

        {categories.map((category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <img
              className={styles.icon}
              alt={category}
              src={DUMMY_IMAGES[index]}
            />
            <button key={index} className={styles.category}>
              {category}
            </button>
          </div>
        ))}
      </div>
    </container>
  );
};

export default LeftSide;
