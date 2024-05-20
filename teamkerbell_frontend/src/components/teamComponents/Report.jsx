// 비매너 신고 컴포넌트
import React from "react";
import { useState } from "react";
import styles from "./Report.module.css";

const DUMMY_MEMBERINFO = [
  {
    id: 1,
    name: "홍길동",
  },
  {
    id: 2,
    name: "삼다수",
  },
  {
    id: 3,
    name: "김연아",
  },
  {
    id: 4,
    name: "이명박",
  },
];

const Report = () => {
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    name: "팀원 선택",
  });
  const [view, setView] = useState(false);
  const [rude, setRude] = useState();

  const inputContent = (event) => {
    setRude(event.target.value);
    console.log(event.target.value);
  };

  const send = () => {
    console.log("user:", selectedItem.id);
    console.log("rude:", rude);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView(false);
    console.log(item);
  };
  /* seletedItem 설정 및 창 닫기 */

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>비매너 신고</h2>
      <hr className={styles.line} />
      <div className={styles.describe}>
        ※ 아래 경우에 해당할 시, 서비스 이용이 제한되며, 법적 책임을 물을 수
        있습니다. 유의하시기 바랍니다. <br />
        1) 사실에 기반하지 않은 내용 작성 시 <br />
        2) 단순 비방, 욕설을 포함하는 경우
      </div>
      <div>
        <ul
          className={styles.list}
          onClick={() => {
            setView(!view); /* 누르면 선택 창 펼쳐짐 */
          }}
        >
          <div>
            <div className={styles.select}>
              <span>{selectedItem.name}</span>
              <span>{view ? "∧" : "∨"}</span>
              {/* 펼쳐져있으면 ^ 출력, 닫혀있으면 ⌄ 출력 */}
            </div>
          </div>

          {/* 펼칠 때 이름 선택하는 창 */}
          {view && (
            <ul className={styles.list}>
              {DUMMY_MEMBERINFO.map((content, index) => (
                <li
                  className={styles.nameSelect}
                  key={index}
                  onClick={() => handleItemClick(content)}
                >
                  {content.name}
                </li>
                /* 이름 누르면 선택창 변경 및 펼친 것 닫음 */
              ))}
            </ul>
          )}
        </ul>
      </div>
      <textarea
        className={styles.boxInput}
        placeholder="신고 이유를 적어주세요"
        value={rude}
        onChange={inputContent}
      ></textarea>
      <div>
        <button onClick={send} className={styles.submitsBtn}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Report;
