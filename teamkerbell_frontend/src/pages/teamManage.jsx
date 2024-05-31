import React, { useEffect, useState } from "react";
import styles from "./teamManage.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";

const leader = 1;
const tid = 0;
const isLeader = () => {
  return true;
};

const EndAgree = 3;
const memberList = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "삼다수" },
  { id: 3, name: "김연아" },
  { id: 4, name: "이명박" },
];
const memberIds = memberList.map((member) => member.id);

const MemberSelection = ({ onSelect }) => {
  const [findNum, setFindNum] = useState("인원 선택");
  const [view, setView] = useState(false);

  const handleItemClick = (item) => {
    setFindNum(item);
    setView(false);
    onSelect(item);
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

/* 메인 */

const TeamManage = () => {
  const setCategoryState = useSetRecoilState(categoryState);

  useEffect(() => {
    setCategoryState(0);
  }, [setCategoryState]);

  const categoryStateValue = useRecoilValue(categoryState);

  const [inputList, setInputList] = useState([{ id: 1, field: "", num: "" }]);
  const [reason, setReason] = useState("");
  const [selectedMember, setSelectedMember] = useState("팀원 선택");
  const [view, setView] = useState(false);

  const reasonChange = (event) => {
    setReason(event.target.value);
    console.log(event.target.value);
  };

  const memClick = (item) => {
    console.log(item.id);
    setSelectedMember(item.name);
  };

  useEffect(() => {
    console.log(selectedMember);
  }, [selectedMember]);

  const addInputList = () => {
    const newId = inputList.length + 1;
    setInputList([...inputList, { id: newId, field: "", num: "" }]);
  };

  const handleFieldChange = (id, value) => {
    setInputList(
      inputList.map((input) =>
        input.id === id ? { ...input, field: value } : input
      )
    );
  };

  const handleNumChange = (id, value) => {
    setInputList(
      inputList.map((input) =>
        input.id === id ? { ...input, num: value } : input
      )
    );
  };

  const vote = () => {
    console.log("종료 투표!");
    // Add post logic here
  };

  const kick = (id) => {
    console.log("퇴출 인원: ", selectedMember);
    console.log("퇴출 이유: ", reason);
    // Add post logic here
  };

  const runChange = (event) => {
    setReason(event.target.value);
    console.log(event.target.value);
  };

  const run = () => {
    console.log("하차 이유: ", reason);
  };

  const plusmatching = () => {
    console.log("최종 배열", inputList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      {isLeader(tid) ? (
        <div className={styles.main}>
          <h2 className={styles.title}>활동 종료</h2>
          <hr className={styles.line} />
          <h4>
            ⨳ 활동 종료는 과반수 이상의 팀원이 종료 여부에 이상이 없음을
            확인하고 찬성 시 팀장의 확인 하에 가능합니다.
          </h4>
          <div className={styles.box}>
            <div className={styles.agreeTitle}>현재 찬성 인원</div>
            <div className={styles.agreeDetail}>
              {EndAgree} / {memberList.length}
            </div>
          </div>
          <button onClick={vote} className={styles.btn}>
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
                  placeholder="모집 분야 입력"
                  className={styles.inputField}
                  onChange={(e) => handleFieldChange(input.id, e.target.value)}
                />
                <MemberSelection
                  onSelect={(item) => handleNumChange(input.id, item)}
                />
              </div>
            ))}
          </div>
          <button onClick={plusmatching} className={styles.btn}>
            추가 매칭 신청
          </button>
          <h2 className={styles.title}>팀원 강제 퇴출</h2>
          <hr className={styles.line} />
          <div>
            <ul
              className={styles.listt}
              onClick={() => {
                setView(!view);
              }}
            >
              <div className={styles.select}>
                <span>{selectedMember}</span>
                <span>{view ? "∧" : "∨"}</span>
              </div>
              {view && (
                <ul className={styles.listt}>
                  {memberList.map((content, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        memClick(content);
                      }}
                      className={styles.text}
                    >
                      {content.name}
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          </div>
          <textarea
            className={styles.kickReason}
            placeholder="팀원 강제 퇴출 사유를 입력해주세요."
            onChange={reasonChange}
          />
          <div className={styles.checkbox}>
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox"></label>
            불공정한 사유로 팀원을 강제 퇴출할 경우 불이익이 있을 수 있음을
            확인하였으며, 위의 내용에 대해 동의합니다.
          </div>
          <button onClick={() => kick(selectedMember)} className={styles.btn}>
            강제 퇴출
          </button>
        </div>
      ) : (
        <div className={styles.main}>
          <h2 className={styles.title}>활동 종료</h2>
          <hr className={styles.line} />
          <h4>
            ⨳ 활동 종료는 과반수 이상의 팀원이 종료 여부에 이상이 없음을
            확인하고 찬성 시 팀장의 확인 하에 가능합니다.
          </h4>
          <div className={styles.box}>
            <div className={styles.agreeTitle}>현재 찬성 인원</div>
            <div className={styles.agreeDetail}>
              {EndAgree} / {memberList.length}
            </div>
          </div>
          <button onClick={vote} className={styles.btn}>
            팀 활동 종료
          </button>
          <h2 className={styles.title}>중도 하차</h2>
          <hr className={styles.line} />
          <textarea
            className={styles.box2}
            placeholder="중도 하차 사유를 입력해주세요."
            onChange={runChange}
          />
          <div className={styles.checkbox}>
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox"></label>
            중도 하차할 경우 불이익이 있을 수 있음을 확인하였으며, 위의 내용에
            대해 동의합니다.
          </div>
          <button onClick={() => run()} className={styles.btn}>
            중도 하차
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamManage;
