import React, { useEffect, useState } from "react";
import styles from "./EndKick.module.css";

//팀장

const EndAgree = 3;
/*동의인원*/
const memberList = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "삼다수" },
  { id: 3, name: "김연아" },
  { id: 4, name: "이명박" },
];
/*최대인원*/ const memberIds = memberList.map((member) => member.id);

/* 인원 선택 박스 */
const MemberSelection = () => {
  const [findNum, setFindNum] = useState("인원 선택");
  const [view, setView] = useState(false);

  const handleItemClick = (item) => {
    setFindNum(item);
    setView(false);
  };

  useEffect(() => {
    console.log(findNum);
  }, [findNum]);

  const toggleView = () => {
    setView(!view); // 선택 창을 열거나 닫습니다.
  };

  return (
    <div className={styles.flex}>
      <ul onClick={toggleView}>
        <div className={styles.select}>
          <span>{findNum}</span> <span>{view ? "∧" : "∨"}</span>
        </div>
        {view && (
          <ul className={styles.numSelect}>
            {memberIds.map((number, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(number)}
                className={styles.text}
              >
                {number}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

const EndLeader = () => {
  const [findNum, setfindNum] = useState();
  const [inputList, setInputList] = useState([{ id: 1 }]); // 초기 상태로 하나의 input과 list를 가진 div를 가집니다.
  const [reason, setReason] = useState();
  const reasonChange = (event) => {
    setReason(event.target.value);
    console.log(event.target.value);
  };

  const memClick = (item) => {
    console.log(item.id);
    setView(false);
    setSelectedMember(item.name);
  };

  const [selectedMember, setSelectedMember] = useState("팀원 선택");

  useEffect(() => {
    console.log(selectedMember);
  }, [selectedMember]);

  const [view, setView] = useState(false);

  const addInputList = () => {
    const newId = inputList.length + 1;
    setInputList([...inputList, { id: newId }]); // 새로운 input과 list가 있는 div를 추가합니다.
  };

  const vote = () => {
    console.log("종료 투표!");
    /*post*/
  };

  const kick = (id) => {
    console.log("퇴출 인원: ", selectedMember);
    console.log("퇴출 이유: ", reason);
    /* post id */
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
          {EndAgree} / {memberList.length}
        </div>
      </div>
      <button onClick={() => vote()} className={styles.btn}>
        팀 활동 종료
      </button>
      <h2 className={styles.title}>추가 매칭 신청</h2>
      <hr className={styles.line} />
      <h3>모집 인원 및 모집 분야 입력</h3>
      <div>
        {inputList.map((input) => (
          <div className={styles.matching} key={input.id}>
            <button className={styles.plusbtn} onClick={addInputList}>
              +
            </button>
            <input
              placeholder=" 모집 분야 입력"
              className={styles.inputField}
            ></input>
            <MemberSelection title="인원 선택" />
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
              <span>{selectedMember}</span> <span>{view ? "∧" : "∨"}</span>
            </div>{" "}
          </div>
          {view && (
            <ul className={styles.listt}>
              {memberList.map((content, index) => (
                <li
                  key={index} // index 대신 number.id 사용
                  onClick={() => {
                    memClick(content);
                  }} // 객체 대신 name 속성을 전달
                  className={styles.text}
                >
                  {content.name}
                </li>
              ))}
            </ul>
          )}
        </ul>{" "}
      </div>{" "}
      <textarea
        className={styles.kickReason}
        placeholder="팀원 강제 퇴출 사유를 입력해주세요."
        onChange={reasonChange}
      ></textarea>
      <div>
        <div className={styles.checkbox}>
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox"></label>
          불공정한 사유로 팀원을 강제 퇴출할 경우 불이익이 있을 수 있음을
          확인하였으며, 위의 내용에 대해 동의합니다.
        </div>
      </div>
      <button onClick={() => kick(findNum)} className={styles.btn}>
        강제 퇴출
      </button>
    </div>
  );
};

export default EndLeader;
