import styles from "./LeftSide.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Tool } from "./team_icon/tool.svg";
import { ReactComponent as ContestInfo } from "./team_icon/contestInfo.svg";
import { ReactComponent as End } from "./team_icon/end.svg";
import { ReactComponent as Finish } from "./team_icon/finish.svg";
import { ReactComponent as MemberInfo } from "./team_icon/memberInfo.svg";
import { ReactComponent as Progress } from "./team_icon/progress.svg";
import { ReactComponent as Report } from "./team_icon/report.svg";

const LeftSide = ({}) => {
  const categories = [
    "협업 툴",
    "공모전 정보",
    "팀원 정보",
    "프로젝트 진행",
    "마무리",
    "비매너 신고",
    "활동 종료",
  ];

  const categoryComponents = [
    Tool,
    ContestInfo,
    MemberInfo,
    Progress,
    Finish,
    Report,
    End,
  ];
  const [switched, setSwitched] = useState(
    Array(categories.length).fill(false)
  );
  const onClick = (index) => {
    const updateButton = switched.map((value, num) =>
      num === index ? !value : value
    );
    /*번호가 일치하면 반전, 나머지 버튼은 유지*/

    setSwitched(updateButton);
    /* 누른 버튼 활성화 */
  };

  return (
    <container className={styles.LeftSide}>
      <div className={styles.left}>
        <p className={styles.teampage}> TeamPage </p>

        {categoryComponents.map((Category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <Category
              className={styles[`icon${switched[index] ? "Clicked" : ""}`]}
            />
            {/* react 컴포넌트 svg 매핑 */}

            <Link to={`/teamtool/option${index + 1}`} className={styles.link}>
              {/*클릭시 해당 옵션 링크로 이동,
              <Link> 태그 제거시 클릭시 색 바뀌는 것 확인 가능*/}

              <button
                key={index}
                className={
                  styles[`category${switched[index] ? "Clicked" : ""}`]
                }
                onClick={() => onClick(index)}
              >
                {/*버튼을 누르면 글씨 색 회색<->검은색 */}
                {categories[index]} {/* button 매핑 */}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </container>
  );
};

export default LeftSide;
