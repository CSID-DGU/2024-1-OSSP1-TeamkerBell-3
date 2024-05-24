// 사이드바 마무리 클릭시 종료시
import React from "react";
import { useState } from "react";
import styles from "./LastAfter.module.css";
import Evaluate from "./LastEvaluate";

const DUMMY_memberList = [
  {
    id: "1",
    name: "홍길동",
  },
  {
    id: "2",
    name: "삼다수",
  },
  {
    id: "3",
    name: "김연아",
  },
  {
    id: "4",
    name: "이명박",
  },
];

const LastAfter = (myreview) => {
  const [scoreTags, setScoreTags] = useState(
    DUMMY_memberList.map((member) => ({
      id: member.id,
      participation: member.participation,
      contribution: member.contribution,
      attribution: member.attribution,
      tag: member.tag,
    }))
  );
  const [review, setReview] = useState(myreview);

  /* 후기 변경시 작동 */
  const reviewChange = (event) => {
    setReview(event.target.value);
    console.log(event.target.value);
  };

  /* 버튼 클릭시 모든 정보 전송 */
  const send = () => {
    console.log("score_tags: ", scoreTags);
    console.log("review:", review);
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>마무리</h2>
      <hr className={styles.line} />
      {<Evaluate DUMMY_memberList={DUMMY_memberList} />}
      <div>
        <h2 className={styles.title}>공모전 후기</h2>
        <hr className={styles.line} />

        <textarea
          className={styles.boxInput}
          placeholder="공모전을 진행한 후기를 작성해주세요."
          onChange={reviewChange}
        ></textarea>

        <button className={styles.submitsBtn} onClick={send}>
          제출
        </button>
        {/* 버튼 클릭시 console 출력 구현예정 */}
      </div>
    </div>
  );
};

export default LastAfter;
