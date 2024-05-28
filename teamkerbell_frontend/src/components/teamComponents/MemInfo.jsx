// 사이드바 팀원 정보 클릭 시

import React from "react";
import styles from "./MemInfo.module.css";

const MemInfo = ({ meminfo }) => {
  console.log("meminfo:", meminfo);
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>팀원 정보</h2>
      </div>
      <hr className={styles.line} />

      {meminfo.map((content, index) => (
        <div className={styles.box} key={index}>
          <div className={styles.boxleft}>
            <img className={styles.memImg} src={content.img} />
            <div className={styles.baseInfo}>
              <div>
                {content.role === "팀장" ? (
                  <img className={styles.crown} src={"../../leadercrown.png"} />
                ) : null}
              </div>
              {/*역할이 '팀장'이면 왕관사진, 나머지는 null*/}

              <h3 className={styles.name}>{content.name}</h3>
              <div className={styles.info}>{content.score}도</div>
            </div>
          </div>

          <div className={styles.boxright}>
            <ul className={styles.boxdescrip}>
              <li>
                <strong>역할: </strong>
                {content.role}
              </li>
              <li>
                <strong>기술 스택: </strong>
                {content.skill}
              </li>
              <li>
                <strong>이메일: </strong>
                {content.email}
              </li>
              <li>
                <strong>Github: </strong>
                {content.githubLink}
              </li>
              <li>
                <strong>백준 티어: </strong>
                {content.tier}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemInfo;
