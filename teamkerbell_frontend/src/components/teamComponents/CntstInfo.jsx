// 사이드바 공모전 정보 클릭 시

import React from "react";
import styles from "./CntstInfo.module.css";

/*팀이 진행중인 공모전정보 더미데이터*/
const DUMMY_CNTST_INFO = {
  title: "생성형 AI 이미지 활용 공모전",
  period: "2024.03.11 ~ 2024.05.17",
  organization: "에프엔가이드",
  theme: "생성형 AI 이미지",
  qualification: "예비 창업자, 3년 미만 스타트업",
  apply: "온라인 지원",
  awards: {
    first: "10,000,000원",
    second: "5,000,000원",
    third: "1,000,000원",
  },
  inquiry: "teamkerbell@dongguk.edu",
  link: "https://github.com/CSID-DGU/2024-1-OSSP1-TeamkerBell-3.git",
};

const MyCntstInfo = () => {
  return (
    <div>
      <h2 className={styles.title2}>{DUMMY_CNTST_INFO.title}</h2>
      <ul className={styles.infoList}>
        <li>접수 기간: {DUMMY_CNTST_INFO.period}</li>
        <li>기관: {DUMMY_CNTST_INFO.organization}</li>
        <li>공모 주제: {DUMMY_CNTST_INFO.theme}</li>
        <li>지원 자격 {DUMMY_CNTST_INFO.qualification}</li>
        <li>지원 방법: {DUMMY_CNTST_INFO.apply}</li>
        <li>
          시상
          <div> 1등 - {DUMMY_CNTST_INFO.awards.first}</div>
          <div> 2등 - {DUMMY_CNTST_INFO.awards.second}</div>
          <div> 3등 - {DUMMY_CNTST_INFO.awards.third}</div>
        </li>
        <li>문의 사항: {DUMMY_CNTST_INFO.inquiry}</li>
        <li>자세히보기 {DUMMY_CNTST_INFO.link}</li>
      </ul>
    </div>
  );
};

/*공모전 과거 입상작 더미데이터*/
const DUMMY_WINREC_INFO = [
  {
    img: "../../comp_example.jpeg",
    generation: "1",
    prize: "대상",
    teamName: "얼레벌레",
    theme: "자연물",
  },
  {
    img: "../../comp_example.jpeg",
    generation: "2",
    prize: "최우수상",
    teamName: "로켓단",
    theme: "포켓몬",
  },
];

const WinRecord = () => {
  return (
    <div>
      <h2 className={styles.title2}>공모전 과거 입상작</h2>
      {DUMMY_WINREC_INFO.map((content, index) => (
        <div className={styles.box} key={index}>
          <div>
            <img className={styles.img} src={content.img} />
          </div>
          <div className={styles.boxtext}>
            <ul className={styles.boxdescrip}>
              <li key={index}>
                제 {content.generation}회 {content.prize}
              </li>
              <li>팀명 : {content.teamName}</li>
              <li>주제 : {content.theme}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContestInfo = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>공모전 정보</h2>
      <hr className={styles.line} />
      <MyCntstInfo />
      <WinRecord /> {/*공모전 입상작*/}
    </div>
  );
};

export default ContestInfo;
