// src/team/{tid}/guideline2.js

import React from "react";
import styles from "./teamToolGit.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms"; // recoil의 전역상태 listState 가져옴

const TeamTool = () => {
  const listStateValue = useRecoilValue(listState); // Recoil 훅을 사용하여 상태 값 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
          <LeftSide />
      </div>
      <div className={styles.main}>
        {listStateValue === 0 ? <Git /> : null}
      </div>
    </div>
  );
};

const Git = () => {
  return (
    <div className={styles.main2}>
      <div className={styles.title}>
        <h2>협업 툴 가이드라인</h2>
      </div>
      <hr className={styles.line} />
      {/*title 정의*/}
      <div className={styles.box}>
        <div className={styles.text}>
          <h1 className={styles.boxtitle}>Github</h1>
          <p> : 개발자 협업 툴</p>
          <a className={styles.hrefbutton} href="https://github.com/">
            클릭 시 연결
          </a>
          <Content />
        </div>
      </div>
      <div>
        <Link to={`/team/0/tools`}>
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
  ["저장소 생성"],
  ["코드 업로드"],
  ["브랜치 관리"],
  ["이슈 관리"],
  ["협업 및 리뷰"],
  ["프로젝트 관리"],
  [" 웹 인터페이스와 Git CLI 활용"],
];

const Descrip = [
  [
    [
      'GitHub에 회원가입 및 로그인한 후, 우측 상단의 "+" 아이콘을 클릭하여 "New repository"를 선택합니다.',
    ],
    [
      '저장소 이름, 설명, 공개 여부 등을 설정하고, "Create repository"를 클릭하여 저장소를 생성합니다.',
    ],
  ],
  [
    [
      '생성된 저장소에 접속하여 "Add file" -> "Upload files"를 선택하여 로컬 컴퓨터에서 코드 파일을 업로드합니다.',
    ],
    [
      "또는 Git을 사용하여 로컬에서 코드를 커밋하고 푸시하여 업로드할 수도 있습니다.",
    ],
  ],

  [
    [
      "새로운 기능을 추가하거나 버그를 수정할 때마다 새로운 브랜치를 생성하여 작업합니다.",
    ],
    [
      '변경 사항을 완료한 후, 변경 내용을 메인 브랜치(일반적으로 "main" 또는 "master")에 병합합니다.',
    ],
  ],

  [
    ["프로젝트의 버그, 개선 사항 또는 작업 목록을 이슈로 등록하고 관리합니다."],
    ["이슈에 댓글을 추가하거나 레이블을 지정하여 상세히 관리합니다."],
  ],
  [
    [
      "팀원들과 저장소를 공유하고, 코드 변경 사항을 리뷰하고 피드백을 주고받습니다.",
    ],
    [
      "Pull Request를 생성하여 변경 사항을 다른 팀원들에게 알리고, 코드 리뷰를 요청합니다.",
    ],
  ],
  [["프로젝트의 진행 상황 및 완료된 작업을 시각화하고 관리합니다."]],
  [
    [
      "GitHub는 웹 기반 인터페이스 뿐만 아니라 Git CLI(Command Line Interface)를 통해 코드를 관리할 수 있습니다.",
    ],
    [
      "Git 명령어를 사용하여 로컬에서 저장소를 관리하고 GitHub와 동기화할 수 있습니다.",
    ],
  ],
];

export default TeamTool;
