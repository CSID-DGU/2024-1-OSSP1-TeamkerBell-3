import React, { useState, useEffect } from "react";
import styles from "./FavoriteComp.module.css";
import CompCard from "../mainComponents/CompCard"; // CompCard 컴포넌트 import
import { Link } from "react-router-dom";

const FavoriteComp = ({ comps }) => {
  // 공모전 목록 데이터
  const [daysLeftList, setDaysLeftList] = useState([]);

  useEffect(() => {
    const currentTime = new Date();
    const newDaysLeftList = comps.map((comps) => {
      const timeDiff = comps.deadline - currentTime.getTime();
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    });
    setDaysLeftList(newDaysLeftList);
  }, []);
  // 백엔드에서 넘겨줄 때 무조건, order-by를 이용해서 넘겨줘야 한다.

  // 공모전 카테고리 목록
  return (
    <div className={styles.container}>
      <h2>찜한 공모전 목록</h2>

      <div className={styles.competitionsContainer}>
        {comps.map((competition, index) => (
          <Link
            to={`/comp/${competition.id}`}
            key={index + 100000}
            className={styles.comp}
          >
            <h3 key={index + 10000}>
              {" "}
              D- <span>{daysLeftList[index]}</span>
            </h3>
            <CompCard
              key={index}
              image={competition.image}
              title={competition.title}
              description={competition.description}
              jobs={competition.jobs}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteComp;
