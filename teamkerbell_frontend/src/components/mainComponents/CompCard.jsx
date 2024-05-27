import React, { useState } from "react";
import styles from "./CompCard.module.css";
import Heart from "react-heart";
import { Link } from "react-router-dom";
import { setCompLiked } from "../../api/user";

const CompCard = ({ id, image, title, description, jobs }) => {
  const [heartActive, setHeartActive] = useState(false);
  // 이미지가 null인 경우 기본 이미지 사용
  const compImage = image || "./public/comp_example.jpeg";
  const localStorageUserId = localStorage.getItem("userId"); // localStorage에서 userId 가져옴
  // title, description, jobs가 null인 경우 빈 문자열로 설정
  const compTitle = title || "";
  const compDescription = description || "";
  const compJobs = jobs || [];
  
  function handleHeartClick() {
    setHeartActive(!heartActive);
    console.log("userId", parseInt(localStorageUserId), "compId", id);
    setCompLiked(parseInt(localStorageUserId), id);
  }
  return (
    <div className={styles.compCard}>
      <Link to={`/comp/${id}`} className={styles.comp}>
        <img src={compImage} alt={compTitle} className={styles.image} />
        <h2 className={styles.title}>{compTitle}</h2>
        <p className={styles.description}>{compDescription}</p>
        <div className={styles.jobs}>
          {compJobs.map((job, index) => (
            <p key={index} className={styles.job}>
              #{job}
            </p>
          ))}
        </div>
      </Link>
      <div className={styles.heart}>
        <Heart
          isActive={heartActive}
          onClick={handleHeartClick}
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
