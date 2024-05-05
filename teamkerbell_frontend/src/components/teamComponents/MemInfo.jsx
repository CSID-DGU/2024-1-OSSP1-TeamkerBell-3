// 사이드바 팀원 정보 클릭 시

import React from "react";
import styles from "./MemInfo.module.css";

const DUMMY_MEMBERINFO = [
  {
    img: "../../memImg.png",
    name: "김동국",
    age: "10",
    gender: "남",
    role: {
      team: "팀장",
      department: "프론트엔드",
    },
    skill: "React",
    email: "dongguk@dongguk.edu",
    github: "dongguk.git",
    baekjoon: "Gold",
  },
  {
    img: "../../memImg.png",
    name: "이동국",
    age: "20",
    gender: "여",
    role: {
      team: "팀원",
      department: "프론트엔드",
    },
    skill: "React",
    email: "dongguk@dongguk.edu",
    github: "dongguk.git",
    baekjoon: "Gold",
  },
  {
    img: "../../memImg.png",
    name: "최동국",
    age: "30",
    gender: "남",
    role: {
      team: "팀원",
      department: "프론트엔드",
    },
    skill: "React",
    email: "dongguk@dongguk.edu",
    github: "dongguk.git",
    baekjoon: "Gold",
  },
  {
    img: "../../memImg.png",
    name: "박동국",
    age: "40",
    gender: "여",
    role: {
      team: "팀원",
      department: "프론트엔드",
    },
    skill: "React",
    email: "dongguk@dongguk.edu",
    github: "dongguk.git",
    baekjoon: "Gold",
  },
];

const MemInfo = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>팀원 정보</h2>
      </div>
      <hr className={styles.line} />

      {DUMMY_MEMBERINFO.map((content, index) => (
        <div className={styles.box} key={index}>
          <div className={styles.boxleft}>
            <img className={styles.memImg} src={content.img} />
            <div className={styles.baseInfo}>
              <div>
                {index === 0 ? (
                  <img className={styles.crown} src={"../../leadercrown.png"} />
                ) : null}
              </div>
              {/*index가 0(최상단의 팀장)에만 왕관사진, 나머지는 null*/}

              <h3 className={styles.name}>{content.name}</h3>
              <div className={styles.info}>
                {content.age} / {content.gender}
              </div>
            </div>
          </div>

          <div className={styles.boxright}>
            <ul className={styles.boxdescrip}>
              <li>
                <strong>역할: </strong>
                {content.role.team}/{content.role.department}
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
                {content.github}
              </li>
              <li>
                <strong>백준 티어: </strong>
                {content.baekjoon}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemInfo;
