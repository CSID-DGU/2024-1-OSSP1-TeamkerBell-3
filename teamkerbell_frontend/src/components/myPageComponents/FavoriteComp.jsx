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
      // endDate가 유효한 Date 객체인지 확인
      const endDate = new Date(comp.endDate);
      if (isNaN(endDate)) {
        // endDate가 유효하지 않으면 daysLeft를 -1로 설정 (또는 다른 처리)
        return { ...comp, daysLeft: -1 };
      }

      const timeDiff = endDate.getTime() - currentTime.getTime();

      // timeDiff가 음수인 경우 (이미 종료된 공모전) daysLeft를 0으로 설정
      const daysLeft =
        timeDiff < 0 ? 0 : Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return { ...comp, daysLeft };
    });

    setFilteredComps(tempFilteredComps);
  }, [comps]);

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
              id={competition.id}
              image={competition.img}
              title={competition.name}
              description={competition.theme}
              jobs={["프론트엔드", "백엔드", "기획", "디자인"]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteComp;
