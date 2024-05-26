import React, { useState, useEffect } from "react";
import styles from "./FavoriteComp.module.css";
import CompCard from "../mainComponents/CompCard"; // CompCard 컴포넌트 import
import { Link } from "react-router-dom";

const FavoriteComp = ({ comps }) => {
  // 공모전 목록 데이터
  const [filteredComps, setFilteredComps] = useState([]);

  useEffect(() => {
    const currentTime = new Date();
    const tempFilteredComps = comps.map((comp) => {
      const timeDiff = comp.deadline - currentTime.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return { ...comp, daysLeft }; // 각 공모전 정보에 daysLeft 속성 추가
    });
    setFilteredComps(tempFilteredComps); // 필터링된 공모전 목록 업데이트
  }, [comps]); // comps가 변경될 때마다 useEffect 실행

  return (
    <div className={styles.container}>
      <h2>찜한 공모전 목록</h2>
      <div className={styles.competitionsContainer}>
        {filteredComps.map((competition, index) => (
          <Link
            to={`/comp/${competition.id}`}
            key={index}
            className={styles.comp}
          >
            <h3>
              D- <span>{competition.daysLeft}</span>
            </h3>
            <CompCard
              image={competition.img}
              title={competition.name}
              description={competition.context}
              jobs={["프론트엔드", "백엔드", "기획", "디자인"]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteComp;
