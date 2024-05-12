// 사이드바 마무리 클릭시 종료시
import React from "react";
import { useState } from "react";
import styles from "./LastAfter.module.css";
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

const DUMMY_MEMBERINFO = [
  {
    name: "홍길동",
    participation: 0,
    contribution: 0,
    personality: 0,
    feedback: "",
  },
  {
    name: "삼다수",
    participation: 0,
    contribution: 0,
    personality: 0,
    feedback: "",
  },
  {
    name: "김연아",
    participation: 0,
    contribution: 0,
    personality: 0,
    feedback: "",
  },
  {
    name: "이명박",
    participation: 0,
    contribution: 0,
    personality: 0,
    feedback: "",
  },
];

const title = ["참여도 ", "기여도 ", "인성/태도"];

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

const Evaluate = () => {
  // 각 버튼에 대한 클릭 여부를 담는 상태 배열
  const [isBorderBlackArray, setIsBorderBlackArray] = useState(
    Array(Tags.length).fill(true)
  );

  // 클릭 핸들러
  const handleClick = (idx) => {
    // 클릭한 버튼의 상태를 변경
    setIsBorderBlackArray((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <div className={styles.box}>
      {title.map((content, eindex) => (
        <div key={eindex} className={styles.box2}>
          <div className={styles.evaTitle}>{content}</div>
          {[1, 2, 3, 4, 5].map((value, index) => (
            <div>
              {value < 6 ? <div className={styles.num}>{value}</div> : null}
              <label key={index} className={styles.radioStyle}>
                <input type="radio" name={content} value={value} />
              </label>
            </div>
          ))}
        </div>
      ))}
      <h3 className={styles.title2}>칭찬 코멘트</h3>
      <hr className={styles.line2} />

      <div className={styles.tags}>
        {[
          Tags.slice(0, 2),
          Tags.slice(2, 5),
          Tags.slice(5, 7),
          Tags.slice(7),
        ].map((group, groupIndex) => (
          <div key={groupIndex} className={styles.tagArray}>
            {group.map((Tag, tagIndex) => (
              <button
                key={groupIndex * 3 + tagIndex} // 올바른 버튼 인덱스 계산
                onClick={() => handleClick(groupIndex * 3 + tagIndex)}
                className={styles.tag}
              >
                <Tag
                  isBorderBlack={isBorderBlackArray[groupIndex * 3 + tagIndex]}
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const LastAfter = () => {
  const [selectedMember, setSelectedMember] = useState();
  const [selectedItem, setSelectedItem] = useState("팀원 선택");
  const [view, setView] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedMember(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? "팀원 선택" : item);
    setView(false);
  };
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>마무리</h2>
      <hr className={styles.line} />
      <h3 className={styles.title2}>평가</h3>
      <hr className={styles.line2} />
      <div className={styles.name}>
        {DUMMY_MEMBERINFO.map((content, index) => (
          <label key={index} className={styles.nameRadio}>
            <input
              type="radio"
              name="memberInfo"
              value={content.name}
              checked={selectedMember === content.name}
              onChange={handleRadioChange}
            />
            <span>{content.name}</span>
          </label>
        ))}
      </div>
      {selectedMember && <Evaluate member={selectedMember} />}{" "}
      {/*이름 버튼 클릭시 Evaluate 컴포 나옴 */}
      <h2 className={styles.title}>개선점</h2>
      <hr className={styles.line} />
      <h4>
        ※ 단순 비방, 욕설 등을 기재할 시, 서비스 이용이 제한될 수 있습니다.
      </h4>
      <div>
        {" "}
        <ul
          className={styles.list}
          onClick={() => {
            setView(!view);
          }}
        >
          <div>
            <div className={styles.select}>
              {selectedItem} {view ? "⌃" : "⌄"}
            </div>{" "}
          </div>
          {view && (
            <ul className={styles.list}>
              {DUMMY_MEMBERINFO.map((content, index) => (
                <li key={index} onClick={() => handleItemClick(content.name)}>
                  {content.name}
                </li>
              ))}
            </ul>
          )}
        </ul>{" "}
      </div>
      <input
        placeholder="개선점을 받을 수 있는 페이지 추가"
        className={styles.boxInput}
      ></input>
      <h2 className={styles.title}>공모전 후기</h2>
      <hr className={styles.line} />
      <input
        placeholder="개선점을 받을 수 있는 페이지 추가"
        className={styles.boxInput}
      ></input>
      <button className={styles.submitsBtn}>제출</button>
      {/* 버튼 클릭시 console 출력 구현예정 */}
    </div>
  );
};

export default LastAfter;
