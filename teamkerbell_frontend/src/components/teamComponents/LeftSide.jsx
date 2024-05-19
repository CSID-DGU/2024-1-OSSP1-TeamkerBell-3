import styles from "./LeftSide.module.css";
import React from "react";
import { useRecoilState } from "recoil";
import { listState } from "../../atoms";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Tool } from "../../stores/team_icon/tool.svg";
import { ReactComponent as ContestInfo } from "../../stores/team_icon/contestInfo.svg";
import { ReactComponent as End } from "../../stores/team_icon/end.svg";
import { ReactComponent as Last } from "../../stores/team_icon/last.svg";
import { ReactComponent as MemberInfo } from "../../stores/team_icon/memberInfo.svg";
import { ReactComponent as Progress } from "../../stores/team_icon/progress.svg";
import { ReactComponent as Report } from "../../stores/team_icon/report.svg";

const LeftSide = ({}) => {
  const categoryComponents = [
    Tool,
    ContestInfo,
    MemberInfo,
    Progress,
    Last,
    Report,
    End,
  ];
  const [categoryNum, setCategoryNum] = useRecoilState(listState);

  const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수를 가져옴

  const onClick = (index) => {
    setCategoryNum(index);
    console.log("[Recoil]categoryNum :", categoryNum);
    /*누른 index로 categoryNum설정*/
    switch (index) {
      case 0:
        navigate("/team/0/tools"); // 0번 index에 해당하는 링크로 이동
        break;
      case 1:
        navigate("/team/0/compinfo"); // 1번 index에 해당하는 링크로 이동
        break;
      case 2:
        navigate("/team/0/members"); // 2번 index에 해당하는 링크로 이동
        break;
      case 3:
        navigate("/team/0/progress"); // 3번 index에 해당하는 링크로 이동
        break;
      case 4:
        navigate("/team/0/evaluation/end/"); // 1번 index에 해당하는 링크로 이동
        break;
      case 5:
        navigate("/team/0/report"); // 1번 index에 해당하는 링크로 이동
        break;
      case 6:
        navigate("/team/0/teamManage"); // 1번 index에 해당하는 링크로 이동
        break;
  
      default:
        break;
    }
  };

  return (
    <div className={styles.leftSide}>
      <div>
        <p className={styles.teampage}> TeamPage </p>

        {categoryComponents.map((Category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <Category
              key={index}
              className={
                categoryNum === index ? styles.clicked : styles.unclicked
                /*카테고리Num이면 styles 변경*/
              }
              onClick={() => onClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
