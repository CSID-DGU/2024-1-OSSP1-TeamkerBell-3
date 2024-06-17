// 사이드바 협업툴 클릭시
import React from "react";
import styles from "./CoopTool.module.css";
import { Link } from "react-router-dom";

//가이드라인 데이터
const GuideDummy = [
  {
    image: "../../w2mImg.png",
    title: "When2Meet",
    description: [
      "회의 시간을 조율하기 위한 스케줄링 도구",
      "그룹 구성원의 시간을 모두 비교",
      "그룹 최적의 회의 시간 도출",
    ],
  },
  {
    image: "../../githubImg.png",
    title: "Github",
    description: [
      "협업을 위한 플랫폼",
      "개발자들의 코드 관리 도구",
      "변경 사항 추적 기능",
    ],
  },
  {
    image: "../../slackImg.png",
    title: "Slack",
    description: ["팀 커뮤니케이션 앱", "실시간 메시징, 파일 공유 등"],
  },
  //가이드 추가 가능
];

const CoopTool = () => {
  const tid = localStorage.tid;
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
                  to={`/team/${tid}/guidelines${index + 1}`}
                  className={styles.link}
                >
                  <button className={styles.detailbutton}>자세히보기</button>
                </Link>
              </div>
              <hr className={styles.boxline} />

              <ul className={styles.boxdescrip}>
                {guide.description.map((desc, descIndex) => (
                  <li key={descIndex} className={styles.boxdescrip}>
                    {desc}
                  </li>
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
