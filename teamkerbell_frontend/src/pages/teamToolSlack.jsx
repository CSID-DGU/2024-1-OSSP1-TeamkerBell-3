// src/team/{tid}/guideline3.js

import React from "react";
import styles from "./teamToolSlack.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms"; // recoil의 전역상태 listState 가져옴

const TeamTool = () => {
  const listStateValue = useRecoilValue(listState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      {/* row로 정렬 */}
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {listStateValue === 0 ? <Slack /> : null}
      </div>
    </div>
  );
};

const Slack = () => {
  const tid = localStorage.tid;
  return (
    <div className={styles.main2}>
      <div className={styles.title}>
        <h2>협업 툴 가이드라인</h2>
      </div>
      <hr className={styles.line} />
      {/* title 정의 */}
      <div className={styles.box}>
        <div className={styles.text}>
          <h1 className={styles.boxtitle}>Slack</h1>
          <p> : 팀원 간 소통 툴</p>
          <a className={styles.hrefbutton} href="https://slack.com/">
            클릭 시 연결
          </a>
          <Content />
        </div>
      </div>
      <div>
        <Link to={`/team/${tid}/tools`} className={styles.link}>
          <button className={styles.backbutton}>목록</button>
        </Link>
        {/* 목록으로 돌아가는 버튼 */}
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      {Title.map((Tcontent, Tindex) => (
        <div key={Tindex} className={styles.section}>
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
    image: "../../slackguide1.png",
    title: "워크스페이스 생성 및 초대",
  },
  {
    image: "../../slackguide2.png",
    title: "채널 생성 및 참여",
  },
  {
    image: "../../slackguide3.png",
    title: "메시지 및 파일 공유",
  },
  {
    image: "../../slackguide4.png",
    title: "봇 및 앱 통합",
  },
];

const Descrip = [
  [
    ["Slack 웹사이트에 접속하여 새로운 워크스페이스를 생성합니다."],
    [
      "워크스페이스 이름 및 URL, 초대할 팀원의 이메일 주소를 입력하여 워크스페이스를 생성하고 팀원을 초대합니다.",
    ],
  ],
  [
    [
      "워크스페이스에 채널을 생성하여 특정 주제 또는 프로젝트에 관련된 대화를 그룹화합니다.",
    ],
    ["필요한 팀원을 해당 채널에 초대하여 참여할 수 있습니다."],
  ],
  [
    [
      "개별 팀원에게 다이렉트 메시지를 보내거나 특정 그룹을 만들어 메시지를 공유할 수 있습니다.",
    ],
    [
      "파일 및 문서를 Slack에 업로드하여 팀원들과 공유하고, Google Drive, Dropbox 등 다른 서비스와 연동하여 파일을 공유할 수 있습니다.",
    ],
  ],
  [
    [
      "Slack 앱 스토어에서 다양한 봇 및 앱을 설치하여 업무 효율성을 높일 수 있습니다.",
    ],
    [
      "예를 들어, 일정 관리, 업무 관리, 알림 등을 자동화할 수 있는 기능을 추가할 수 있습니다.",
    ],
  ],
];

export default TeamTool;
