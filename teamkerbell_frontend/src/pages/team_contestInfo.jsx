// src/team/option1.js
import React from "react";
import styles from "./team_contestInfo.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import CompDetail from "../components/matchingComponents/CompDetail"; // CompDetail 컴포넌트 import

const DUMMY_COMP_DETAIL = {
  image: "../../comp_example.jpeg",
  title: "생성형 AI 이미지 활용 공모전",
  period: "2024.03.11 ~ 2024.05.17",
  daycount: "D-40",
  organization: "에프엔가이드",
  theme: "생성형 AI 이미지",
  qualification: "예비 창업자, 3년 미만 스타트업",
  apply: "온라인 지원",
  awards: ["1등 -  10,000,000원", "2등 - 5,000,000원", "3등 - 1,000,000원"],
  inquiry: "teamkerbell@dongguk.edu",
  link: "https://github.com/CSID-DGU/2024-1-OSSP1-TeamkerBell-3.git",
};

const DUMMY_WIN_IMG = ["../../comp_example.jpeg", "../../comp_example.jpeg"];
/*공모전 입상작 사진 더미데이터*/

const DUMMY_WINREC_DETAIL = [
  [["제 1회"], ["대상"], ["얼레벌레"], ["자연물"]],
  [["제 1회"], ["최우수상"], ["로켓단"], ["포켓몬"]],
];
/*공모전 입상작 더미데이터*/

const DUMMY_SPECIFY = [[""], [""], ["팀명: "], ["주제: "]];

const WinRecord = () => {
  return (
    <div className={styles.winningContainer}>
      <h2 className={styles.title2}>공모전 과거 입상작</h2>
      <div>
        {DUMMY_WIN_IMG.map((content, index) => (
          <div className={styles.box} key={index}>
            <div>
              <img className={styles.img} src={content} />
            </div>
            <div className={styles.boxtext}>
              <ul className={styles.boxdescrip}>
                {DUMMY_WINREC_DETAIL[index].map((content2, index2) => (
                  <li key={index2}>
                    {DUMMY_SPECIFY[index2]} {/*구분목록 출력*/}
                    {content2} {/*입상작 세부데이터 출력*/}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContestInfo = () => {
  return (
    <div className={styles.container}>
      {/*row로 정렬*/}
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <p>공모전 정보</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.compDetailContainer}>
          <CompDetail
            image={DUMMY_COMP_DETAIL.image}
            title={DUMMY_COMP_DETAIL.title}
            period={DUMMY_COMP_DETAIL.period}
            daycount={DUMMY_COMP_DETAIL.daycount}
            organization={DUMMY_COMP_DETAIL.organization}
            theme={DUMMY_COMP_DETAIL.theme}
            qualification={DUMMY_COMP_DETAIL.qualification}
            apply={DUMMY_COMP_DETAIL.apply}
            awards={DUMMY_COMP_DETAIL.awards}
            inquiry={DUMMY_COMP_DETAIL.inquiry}
            link={DUMMY_COMP_DETAIL.link}
          />
        </div>
        <WinRecord /> {/*공모전 입상작*/}
      </div>
    </div>
  );
};

export default ContestInfo;
