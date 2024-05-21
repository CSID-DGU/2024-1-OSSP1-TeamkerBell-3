// 사이드바 협업툴 클릭시
import React from "react";
import styles from "./CoopTool.module.css";
import { Link } from "react-router-dom";

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
    title: "Slack",
    description: ["슬랙 설명", "용도 사용법"],
  },
  //가이드 추가 가능
];

const CoopTool = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>협업 툴 가이드라인</h2>

      <hr className={styles.line} />

      {GuideDummy.map((guide, index) => (
        <div key={index}>
          <div className={styles.box}>
            <img className={styles.img} src={guide.image} alt={guide.title} />
            <div className={styles.text}>
              <div className={styles.boxtop}>
                <h2 className={styles.boxtitle}>{guide.title}</h2>
                <Link
                  to={`/team/0/guidelines${index + 1}`}
                  className={styles.link}
                >
                  <button className={styles.detailbutton}>자세히보기</button>
                </Link>
              </div>
              <hr className={styles.boxline} />

              <ul className={styles.boxdescrip}>
                {guide.description.map((desc) => (
                  <li className={styles.boxdescrip}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoopTool;
