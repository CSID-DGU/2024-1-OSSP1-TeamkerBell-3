// src/team/option3.js
import React from "react";
import styles from "./team_memInfo.module.css";
import LeftSide from "../components/teamComponents/LeftSide";

const SPECIFY = [
  ["역할: "],
  ["기술 스택: "],
  ["이메일: "],
  ["Github: "],
  ["백준 티어: "],
];

const DUMMY_MEMBERINFO = [
  [
    ["../../memImg.png"],
    ["김동국"],
    ["10"],
    ["남"],
    ["팀장"],
    ["프론트엔드"],
    ["React"],
    ["dongguk@dongguk.edu"],
    ["dongguk.git"],
    ["Gold"],
  ],
  [
    ["../../memImg.png"],
    ["이동국"],
    ["20"],
    ["여"],
    ["팀원"],
    ["프론트엔드"],
    ["React"],
    ["dongguk@dongguk.edu"],
    ["dongguk.git"],
    ["Gold"],
  ],
  [
    ["../../memImg.png"],
    ["박동국"],
    ["30"],
    ["남"],
    ["팀원"],
    ["프론트엔드"],
    ["React"],
    ["dongguk@dongguk.edu"],
    ["dongguk.git"],
    ["Gold"],
  ],
  [
    ["../../memImg.png"],
    ["최동국"],
    ["40"],
    ["여"],
    ["팀원"],
    ["프론트엔드"],
    ["React"],
    ["dongguk@dongguk.edu"],
    ["dongguk.git"],
    ["Gold"],
  ],
];

const MemInfo = () => {
  return (
    <div className={styles.container}>
      {/*row로 정렬*/}
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <p>팀원 정보</p>
        </div>
        <hr className={styles.line} />

        {DUMMY_MEMBERINFO.map((content, index) => (
          <div className={styles.box} key={index}>
            <div className={styles.boxleft}>
              <img className={styles.memImg} src={content[0]} />
              <div className={styles.baseInfo}>
                <div>
                  {index === 0 ? (
                    <img
                      className={styles.crown}
                      src={"../../leadercrown.png"}
                    />
                  ) : null}
                </div>
                {/*index가 0(최상단의 팀장)에만 왕관사진, 나머지는 null*/}

                <h4 className={styles.name}>{content[1]}</h4>
                <div className={styles.info}>
                  {content[2]} / {content[3]}
                </div>
              </div>
            </div>

            <div className={styles.boxright}>
              <div className={styles.specify}>
                {SPECIFY.map((sCont, sidx) => (
                  /*더미데이터 배열 중 4 이후 인덱스 이용*/
                  <div key={sidx}>{sCont}</div>
                ))}
              </div>
              <div className={styles.boxdescrip}>
                {content[4]}/{content[5]}
                {content.slice(6).map((description, idx) => (
                  /*더미데이터 배열 중 4 이후 인덱스 이용*/
                  <div key={idx}>{description}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemInfo;
