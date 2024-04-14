// src/team.js
import React from "react";
import styles from "./team.module.css";
import LeftSide from "../components/teamComponents/LeftSide";

const TeamTool = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>TEAM PAGE base</h1>
        </div>
      </div>
    </div>
  );
};

export default TeamTool;
