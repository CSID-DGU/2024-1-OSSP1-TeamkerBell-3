import React, { useState } from "react";
import styles from "./EndRun.module.css";

const EndAgree = 4;
/*동의인원*/

const MEMBER = [
  {
    name: "홍길동",
    id: 1,
  },
  {
    name: "삼다수",
    id: 2,
  },
  {
    name: "김연아",
    id: 3,
  },
  {
    name: "이명박",
    id: 4,
  },
];

const EndRun = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>활동 종료</h2>
      <hr className={styles.line} />
      <h4>
        ⨳ 활동 종료는 과반수 이상의 팀원이 종료 여부에 이상이 없음을 확인하고
        찬성 시 팀장의 확인 하에 가능합니다.
      </h4>
      <div className={styles.box}>
        <div className={styles.agreeTitle}>현재 찬성 인원</div>
        <div className={styles.agreeDetail}>
          {EndAgree} / {MEMBER.length}
        </div>
      </div>
      <button className={styles.btn}>팀 활동 종료</button>

      <h2 className={styles.title}>중도 하차</h2>
      <hr className={styles.line} />
      <input
        className={styles.box2}
        placeholder=" 중도 하차 사유를 입력해주세요."
      ></input>
      <div>
        <div className={styles.checkbox}>
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox"></label>
          중도 하차할 경우 불이익이 있을 수 있음을 확인하였으며, 위의 내용에
          대해 동의합니다.
        </div>
      </div>
      <button className={styles.btn}>중도 하차</button>
    </div>
  );
};

export default EndRun;
