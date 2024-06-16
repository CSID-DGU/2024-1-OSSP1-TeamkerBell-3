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
      <div className={styles.main}>{listStateValue === 0 ? <W2M /> : null}</div>
    </div>
  );
};

const W2M = () => {
  const tid = localStorage.tid;
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
        <Link to={`/team/${tid}/tools`} className={styles.link}>
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
          <h3>
            {Tindex + 1}. {Tcontent.title}
          </h3>
          {/* 제목 mapping 출력 */}
          <div className={styles.container}>
            {Tcontent.image && (
              <img
                className={styles.img}
                src={Tcontent.image}
                alt={`Guide Image ${Tindex + 1}`}
              />
            )}
            <ul className={styles.tRight}>
              {Descrip[Tindex].map((Dcontent, Dindex) => (
                <li key={Dindex}>
                  {Dcontent} {/* 해당하는 Descrip의 요소를 출력 */}
                </li>
              ))}
            </ul>
            {/* 세부 mapping 출력 */}
          </div>
        </div>
      ))}
    </div>
  );
};

const Title = [
  {
    image: "../../w2mguide1.png",
    title: "이벤트 생성",
  },
  {
    image: "../../w2mguide2.png",
    title: "링크 공유",
  },
  {
    image: "../../w2mguide3.png",
    title: "시간 선택 및 결과 확인",
  },
]; /*const Title = [
  ["이벤트 생성"],
  ["링크 공유"],
  ["가능한 시간 선택 "],
  ["결과 확인 및 최적 시간 결정"],
];*/

const Descrip = [
  [
    ["상단 버튼 클릭을 통해 When2Meet 홈페이지에 접속합니다."],
    ["이벤트의 이름을 입력하고 날짜 범위를 선택합니다. "],
    ['"Create Event" 버튼을 클릭하여 이벤트를 생성합니다.'],
  ],
  [
    ["이벤트 생성이 완료되면, 고유한 이벤트 링크가 생성됩니다."],
    [
      "이 링크를 참가자들과 공유하여 팀원들이 자신의 가능한 시간을 표시할 수 있게 합니다.",
    ],
  ],

  [
    ["참가자들은 공유받은 링크를 통해 이벤트 페이지에 접속합니다."],
    [
      "참가자는 자신의 이름을 입력한 후, 왼쪽 섹션에서 가능한 시간을 드래그하여 선택합니다. ",
    ],
    [
      "모든 참가자의 가능한 시간과 겹치는 시간을 오른쪽 섹션에서 확인할 수 있습니다. ",
    ],
    ["가장 많은 사람들이 참여할 수 있는 시간대를 기준으로 결정합니다."],
  ],
];

export default TeamTool;
