// src/team/option1/detail1.js
import React from "react";
import styles from "./teamToolW2M.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms"; // recoil의 전역상태 listState 가져옴
import { Link } from "react-router-dom";

const TeamTool = () => {
  const listStateValue = useRecoilValue(listState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      {/*row로 정렬*/}
      <div className={styles.left}>
          <LeftSide />
      </div>
      <div className={styles.main}>
        {listStateValue === 0 ? <W2M /> : null}
      </div>
    </div>
  );
};

const W2M = () => {
  return (
    <div className={styles.main2}>
      <div className={styles.title}>
        <h2>협업 툴 가이드라인</h2>
      </div>

      <hr className={styles.line} />
      {/*title 정의*/}

      <div className={styles.box}>
        <div className={styles.text}>
          <h1 className={styles.boxtitle}>When2Meet</h1>
          <p> : 회의 일정 조율 웹사이트</p>
          <a className={styles.hrefbutton} href="https://www.when2meet.com/">
            클릭 시 연결
          </a>
          <Content />
        </div>
      </div>
      <div>
        <Link to={`/team/0/tools`} className={styles.link}>
          <button className={styles.backbutton}>목록</button>
        </Link>
        {/*목록으로 돌아가는 버튼*/}
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      {Title.map((Tcontent, Tindex) => (
        <div key={Tindex}>
          <h3 key={Tindex}>
            {Tindex + 1}. {Tcontent}
          </h3>
          {/* 제목 mapping 출력 */}

          <ul>
            {Descrip[Tindex].map((Dcontent, Dindex) => (
              <li key={Dindex}>
                {Dcontent} {/* 해당하는 Descrip의 요소를 출력 */}
              </li>
            ))}
          </ul>

          {/* 세부 mapping 출력 */}
        </div>
      ))}
    </div>
  );
};

const Title = [
  ["이벤트 생성"],
  ["이벤트 설정"],
  ["링크 공유"],
  ["가능한 시간 선택"],
  ["결과 확인 및 최적 시간 결정"],
];

const Descrip = [
  [
    ["When2Meet 홈페이지에 접속합니다."],
    [
      ' "Create a New Event" 섹션에서 이벤트의 이름과 자신의 이름을 입력합니다.',
    ],
    [
      "날짜 범위를 선택합니다. 시작일과 종료일을 설정하여 해당 기간 동안의 가능한 모든 시간을 표시합니다.",
    ],
    ['"Create Event" 버튼을 클릭하여 이벤트를 생성합니다.'],
  ],
  [
    [
      "이벤트를 생성한 후, 시간대를 확인하고 필요에 따라 조정합니다. When2Meet은 기본적으로 시스템의 시간대를 사용하지만, 이는 변경이 가능합니다.",
    ],
    ['"Save This Event" 버튼을 클릭하여 설정을 저장합니다.'],
  ],

  [
    [
      "이벤트 생성이 완료되면, 고유한 이벤트 링크가 생성됩니다. 이 링크를 참가자들과 공유하여 그들이 자신의 가능한 시간을 표시할 수 있게 합니다.",
    ],
  ],

  [
    ["참가자들은 공유받은 링크를 통해 이벤트 페이지에 접속합니다.     "],
    [
      '참가자는 자신의 이름을 입력한 후, "Available" 섹션에서 가능한 시간을 드래그하여 선택합니다. 선택된 시간은 다른 참가자들에게도 보여집니다.',
    ],
    [
      "참가자들은 필요에 따라 언제든지 자신의 가능한 시간을 업데이트할 수 있습니다. ",
    ],
  ],
  [
    [
      "이벤트 주최자와참가자들은 When2Meet 페이지에서 모든 참가자의 가능한 시간이 겹치는 부분을 확인할 수 있습니다. 이는 보통 녹색으로 표시됩니다. ",
    ],
    [
      "가장 많은 사람들이 참여할 수 있는 시간대를 기준으로 모임이나 이벤트의 시간을 결정합니다.",
    ],
  ],
];

export default TeamTool;
