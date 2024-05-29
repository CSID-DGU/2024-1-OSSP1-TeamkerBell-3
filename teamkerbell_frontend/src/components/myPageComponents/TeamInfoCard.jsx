import styles from "./ManageProject.module.css";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 상태
import { useNavigate } from "react-router-dom";

const TeamInfoCard = ({ TeamInfo }) => {
  return (
    <div className={styles.competitionsContainer}>
      <h3 className={styles.colorGreenH3}>모집중인 프로젝트</h3>
      <div className={styles.projcets}>
        <>
          <h3>{TeamInfo.compTitle}</h3>
          <ul>
            <li>매칭 유형: {TeamInfo.isRandom ? "랜덤 매칭" : "선택 매칭"}</li>
            <li>매칭일시:{TeamInfo.startDate}</li>
            <li>팀원 수:{TeamInfo.recruitNum}</li>
            <li>
              {"모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다."}
            </li>
          </ul>
        </>
      </div>
    </div>
  );
};

export default TeamInfoCard;
