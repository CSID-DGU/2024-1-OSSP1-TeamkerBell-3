import React, { useState } from "react";
import styles from "./EndKick.module.css";

const EndAgree = 4;
/*동의인원*/

const name = ["홍길동", "삼다수", "김연아", "이명박"];
/*최대인원*/

const numbers = Array.from(
  { length: name.length - 1 },
  (_, index) => index + 1
);

const MemberSelection = () => {
  const [selectedItem, setSelectedItem] = useState("인원선택");
  const [view, setView] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView(false);
  };

  const toggleView = () => {
    setView(!view); // 선택 창을 열거나 닫습니다.
  };
  return (
    <div className={styles.list}>
      <ul onClick={toggleView}>
        <div>
          <div className={styles.select}>
            {selectedItem} {view ? "⌄" : "⌃"}
          </div>{" "}
        </div>
        {view && (
          <ul className={styles.list}>
            {numbers.map((number, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(number)}
                className={styles.text}
              >
                {number}
              </li>
            ))}
          </ul>
        )}{" "}
      </ul>{" "}
    </div>
  );
};

const EndLeader = () => {
  const [selectedItem, setSelectedItem] = useState("인원 선택");
  const [inputList, setInputList] = useState([{ id: 1 }]); // 초기 상태로 하나의 input과 list를 가진 div를 가집니다.

  const [selectedMember, setSelectedMember] = useState("팀원 선택");
  const [view, setView] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedMember(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? "팀원 선택" : item);
    setView(false);
  };

  const addInputList = () => {
    const newId = inputList.length + 1;
    setInputList([...inputList, { id: newId }]); // 새로운 input과 list가 있는 div를 추가합니다.
  };
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
          {EndAgree} / {name.length}
        </div>
      </div>
      <button className={styles.btn}>팀 활동 종료</button>
      <h2 className={styles.title}>추가 매칭 신청</h2>
      <hr className={styles.line} />
      <h3>모집 인원 및 모집 분야 입력</h3>
      <div>
        {inputList.map((input) => (
          <div key={input.id}>
            <button className={styles.plusbtn} onClick={addInputList}>
              +
            </button>
            <input
              placeholder=" 모집 분야 입력"
              className={styles.inputField}
            ></input>
            <MemberSelection title="인원선택" />
          </div>
        ))}{" "}
      </div>
      <button className={styles.btn}>추가 매칭 신청</button>
      <h2 className={styles.title}>팀원 강제 퇴출</h2>
      <hr className={styles.line} />
      <div>
        {" "}
        <ul
          className={styles.listt}
          onClick={() => {
            setView(!view);
          }}
        >
          <div>
            <div className={styles.select}>
              {selectedMember} {view ? "⌃" : "⌄"}
            </div>{" "}
          </div>
          {view && (
            <ul className={styles.list}>
              {name.map((content, index) => (
                <li key={index} onClick={() => setSelectedMember(content)}>
                  {content}
                </li>
              ))}
            </ul>
          )}
        </ul>{" "}
      </div>{" "}
      <input
        className={styles.box2}
        placeholder=" 팀원 강제 퇴출 사유를 입력해주세요."
      ></input>
      <div>
        <div className={styles.checkbox}>
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox"></label>
          불공정한 사유로 팀원을 강제 퇴출할 경우 불이익이 있을 수 있음을
          확인하였으며, 위의 내용에 대해 동의합니다.
        </div>
      </div>
      <button className={styles.btn}>강제 퇴출</button>
    </div>
  );
};

export default EndLeader;
