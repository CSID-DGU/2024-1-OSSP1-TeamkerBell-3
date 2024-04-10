// src/teamtool.js
import React from "react";
import styles from "./teamtool.module.css";
import LeftSide from "../components/teampage/LeftSide";

const TeamTool = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
        <Left />
      </div>
      <div className={styles.main}>
        <Main />
      </div>
    </div>
  );
};

const Left = () => {};
const Main = () => {};

export default TeamTool;
