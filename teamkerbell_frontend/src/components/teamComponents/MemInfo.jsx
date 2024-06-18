import React from "react";
import styles from "./MemInfo.module.css";

const MemInfo = ({ meminfo }) => {
  console.log("meminfo:", meminfo);

  // get에서 받은 팀리스트 중 첫 요소가 "팀장"이 아닐 때만 배열을 역순으로
  const sortedMeminfo =
    meminfo[0].role !== "팀장" ? [...meminfo].reverse() : meminfo;

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>팀원 정보</h2>
      </div>
      <hr className={styles.line} />

      <div>
        {sortedMeminfo.map((content, index) => (
          <div className={styles.box} key={index}>
            <div className={styles.boxleft}>
              <img
                className={styles.memImg}
                src={content.img}
                alt="프로필사진"
              />
              <div className={styles.baseInfo}>
                <div>
                  {content.role === "팀장" ? (
                    <img
                      className={styles.crown}
                      src={"../../leadercrown.png"}
                      alt="팀장표시"
                    />
                  ) : null}
                </div>
                {/*역할이 '팀장'이면 왕관사진, 나머지는 null*/}
                <h3 className={styles.name}>{content.name}</h3>
                <div className={styles.info}>{content.score.toFixed(1)}도</div>
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
                <hr className={styles.tierline} />
                <li>
                  <strong>백준 티어: </strong>
                  <br />
                  <img
                    src={`https://mazassumnida.wtf/api/v2/generate_badge?boj=${content.tier}`}
                    alt="백준 티어 이미지"
                    className={styles.tier}
                  ></img>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemInfo;
