import React from "react";
import styles from "./CompCard.module.css"; // CompCard 컴포넌트의 스타일 파일

const CompCard = ({ image, title, description, job }) => {
  return (
    <div className={styles.compCard}>
      <img src={image} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.job}>{job}</p>
    </div>
  );
};

export default CompCard;
