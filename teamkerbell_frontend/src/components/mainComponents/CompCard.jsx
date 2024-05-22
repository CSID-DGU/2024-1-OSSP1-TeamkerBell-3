import React, { useState } from "react";
import styles from "./CompCard.module.css";
import Heart from "react-heart";
import { Link } from "react-router-dom";

const CompCard = ({ id, image, title, description, jobs }) => {
  const [heartActive, setHeartActive] = useState(false);

  return (
    <div className={styles.compCard}>
      <Link to={`/comp/${id}`} className={styles.comp}>
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
      </Link>
      <div className={styles.heart}>
        <Heart
          isActive={heartActive}
          onClick={() => setHeartActive(!heartActive)}
          inactiveColor="rgba(255,125,125,.75)"
          activeColor="#e019ae"
          animationTrigger="both"
          animationDuration={0.1}
        />
      </div>
    </div>
  );
};

export default CompCard;
