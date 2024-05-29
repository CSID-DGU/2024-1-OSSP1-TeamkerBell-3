import React, { useState, useEffect } from "react";
import styles from "./FavoriteComp.module.css";
import CompCard from "../mainComponents/CompCard";
import { Link } from "react-router-dom";

const FavoriteComp = ({ comps }) => {
  const [filteredComps, setFilteredComps] = useState([]);

  useEffect(() => {
    const currentTime = new Date();

    const tempFilteredComps = comps.map((comp) => {
      const endDate = new Date(comp.endDate);
      if (isNaN(endDate)) {
        return { ...comp, daysLeft: -1 };
      }

      const timeDiff = endDate.getTime() - currentTime.getTime();
      const daysLeft =
        timeDiff < 0 ? 0 : Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return { ...comp, daysLeft };
    });

    // Filter out competitions with daysLeft less than 0 and sort
    const filteredAndSortedComps = tempFilteredComps
      .filter((comp) => comp.daysLeft > 0)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    setFilteredComps(filteredAndSortedComps);
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
