// src/team/option1/detail3.js

import React from "react";
import styles from "./team_tool_op2.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { Link } from "react-router-dom";

const TeamTool = () => {
  return (
    <div className={styles.container}>
      {/*row로 정렬*/}
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <p>협업 툴 가이드라인</p>
        </div>

        <hr className={styles.line} />
        {/*title 정의*/}

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
          <Link to={`/team/option1/`} className={styles.link}>
            <button className={styles.backbutton}>목록</button>
          </Link>
          {/*목록으로 돌아가는 버튼*/}
        </div>
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
  ["워크스페이스 생성"],
  ["채널 생성 및 참여"],
  ["다이렉트 메시지 및 그룹 메시지"],
  ["파일 공유 및 통합"],
  ["봇 및 앱 통합"],
];

const Descrip = [
  [
    ["Slack 웹사이트에 접속하여 새로운 워크스페이스를 생성합니다."],
    [
      "워크스페이스 이름 및 URL, 초대할 팀원의 이메일 주소를 입력하여 워크스페이스를 생성합니다.",
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
  ],
  [
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
