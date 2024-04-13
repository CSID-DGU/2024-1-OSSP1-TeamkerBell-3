// src/teamtool.js
import React from "react";
import styles from "./teampage_tool.module.css";
import LeftSide from "../components/teamComponents/LeftSide";

const DUMMY_IMAGES = ["../../comp_exxample.jpeg", "../../comp_exxample.jpeg"];

//가이드라인 데이터
const GuideDummy = [
  {
    image: "../../comp_example.jpeg",
    title: "When2Meet",
    description: ["When2Meet 설명", "용도 사용법"],
  },
  {
    image: "../../comp_example.jpeg",
    title: "Github",
    description: ["깃허브 설명", "용도 사용법"],
  },
  {
    image: "../../comp_example.jpeg",
    title: "slack",
    description: ["슬랙 설명", "용도 사용법"],
  },
  //가이드 추가 가능
];

const TeamTool = () => {
  return (
    <div className={styles.container}>
      {/*row로 정렬*/}
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <p>협업 툴 가이드라인</p>
        </div>

        <hr className={styles.line} />

        {GuideDummy.map((guide, index) => (
          <div key={index}>
            <div className={styles.box}>
              <img className={styles.img} src={guide.image} alt={guide.title} />
              <div className={styles.text}>
                <h2 className={styles.boxtitle}>{guide.title}</h2>
                <hr className={styles.boxline} />

                <ul>
                  {guide.description.map((desc, descIndex) => (
                    <li className={styles.boxdescrip}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTool;
