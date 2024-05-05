import React from "react";
import styles from "./CompCard.module.css"; // CompCard 컴포넌트의 스타일 파일

const CompCard = ({ image, title, description, jobs }) => {
  return (
    <div className={styles.compCard}>
      <img src={image} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.jobs}>
        {jobs.map((job, index) => (
          <p key={index} className={styles.job}>
            #{job}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CompCard;
