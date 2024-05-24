import React from "react";
import { useState, useEffect } from "react";
import styles from "./LastEvaluate.module.css";

import Fast from "../../stores/tags/FastManTag";
import Reply from "../../stores/tags/GoodReplyManTag";
import Respect from "../../stores/tags/GoodRespectManTag";
import Mood from "../../stores/tags/MoodMakerManTag";
import Listen from "../../stores/tags/GoodListenerManTag";
import Feedback from "../../stores/tags/FeedbackManTag";
import Lead from "../../stores/tags/LeadershipManTag";
import Compliment from "../../stores/tags/ComplimentManTag";
import Plan from "../../stores/tags/PlannerManTag";
import Passion from "../../stores/tags/FireManTag";

const Tags = [
  Fast,
  Reply,
  Respect,
  Mood,
  Listen,
  Feedback,
  Lead,
  Compliment,
  Plan,
  Passion,
];

const Evaluate = ({ DUMMY_memberList }) => {
  const [id, setId] = useState();
  const [scores, setScores] = useState(
    DUMMY_memberList.map((member) => ({
      id: member.id,
      participation: 0,
      contribution: 0,
      attitude: 0,
      tag: [],
    }))
  );

  const nameClicked = (event) => {
    console.log(event.target.value);
    setId(event.target.value);
  };

  useEffect(() => {
    console.log(scores);
  }, [scores]);
  /* 평가 값이 변할 때마다 콘솔 출력 */

  const title = ["참여도", "기여도", "인성/태도"];

  const scoreClicked = (event) => {
    const updatedScores = scores.map((score) => {
      // id와 score.id를 문자열로 변환하여 비교
      if (score.id.toString() === id.toString()) {
        // 참여도 업데이트
        if (event.target.name === "참여도") {
          return { ...score, participation: event.target.value };
        }
        // 성실성 업데이트
        else if (event.target.name === "기여도") {
          return { ...score, contribution: event.target.value };
        }
        // 팀워크 업데이트
        else if (event.target.name === "인성/태도") {
          return { ...score, attitude: event.target.value };
        }
      }
      // 일치하지 않는 경우 원래 객체 반환
      return score;
    });

    setScores(updatedScores); // 업데이트된 scores 배열로 상태 업데이트
  };

  const [isBorderBlackArray, setIsBorderBlackArray] = useState(
    Array(Tags.length).fill(true)
  );

  const tagColorHandle = (idx) => {
    // 클릭한 버튼의 상태를 변경
    setIsBorderBlackArray((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });

    console.log(idx);
    const updatedScores = scores.map((score) => {
      // id와 score.id를 문자열로 변환하여 비교
      if (score.id.toString() === id.toString()) {
        // tags 속성이 이미 존재한다면 해당 배열에 idx 추가, 그렇지 않다면 새 배열 생성
        const updatedTag = score.tag ? [...score.tag, idx] : [idx];
        updatedTag.sort((a, b) => a - b); /* tag 정렬 */
        return { ...score, tag: updatedTag };
      }
      // 일치하지 않는 경우 원래 객체 반환
      return score;
    });

    setScores(updatedScores); // 업데이트된 scores 배열로 상태 업데이트
  };

  const [feedback, setFeedback] = useState();
  const feedbackChange = (event) => {
    setFeedback(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={styles.box}>
      <h3 className={styles.title2}>평가</h3>
      <hr className={styles.line2} />

      {/* 이름 버튼 */}
      <div className={styles.name}>
        {DUMMY_memberList.map((name) => (
          <label className={styles.nameRadio}>
            <input
              type="radio"
              name="memberInfo"
              value={name.id}
              onChange={nameClicked}
            />
            <span>{name.name}</span>
          </label>
        ))}
      </div>

      {/* 상호평가 */}
      {title.map((title, eindex) => (
        <div key={eindex} className={styles.box2}>
          <div className={styles.evaTitle}>{title}</div>
          {[1, 2, 3, 4, 5].map((value, index) => (
            <div>
              {value < 6 ? <div className={styles.num}>{value}</div> : null}
              <label key={index} className={styles.radioStyle}>
                <input
                  type="radio"
                  name={title}
                  value={value}
                  onClick={scoreClicked}
                />
              </label>
            </div>
          ))}
        </div>
      ))}
      <p></p>

      {/* 태그 선택 */}
      <h3 className={styles.title2}>칭찬 코멘트</h3>
      <hr className={styles.line2} />

      <div className={styles.tags}>
        {[
          Tags.slice(0, 2), // 0, 1
          Tags.slice(2, 5), // 2, 3, 4
          Tags.slice(5, 7), // 5, 6
          Tags.slice(7), // 7, 8, 9
        ].map((group, groupIndex) => (
          <div key={groupIndex} className={styles.tagArray}>
            {group.map((Tag, tagIndex) => {
              // 전체 Tags 배열에서 현재 태그의 인덱스를 찾음
              const fullIndex = Tags.indexOf(Tag);
              return (
                <button
                  key={fullIndex} // 각 태그의 실제 인덱스를 키로 사용
                  onClick={() => {
                    tagColorHandle(fullIndex); // 올바른 인덱스로 핸들러 호출
                  }}
                  className={styles.tag}
                >
                  <Tag
                    isBorderBlack={isBorderBlackArray[fullIndex]} // 올바른 인덱스로 상태 확인
                  />
                </button>
              );
            })}
          </div>
        ))}
        <h3 className={styles.title2}>개선점</h3>
        <hr className={styles.line2} />
        <p>
          ※ 단순 비방, 욕설 등을 기재할 시, 서비스 이용이 제한될 수 있습니다.
        </p>

        <textarea
          className={styles.boxInput}
          placeholder="해당 팀원이 개선해야 할 점을 작성해 주세요."
          onChange={feedbackChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Evaluate;
