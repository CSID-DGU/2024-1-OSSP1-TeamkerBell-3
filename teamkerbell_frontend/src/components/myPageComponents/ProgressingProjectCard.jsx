import styles from "./ManageProject.module.css";

const ProgressingProjcetCard = ({ progressingProjcets }) => {
  return (
    <div className={styles.competitionsContainer}>
      <h3 className={styles.colorGreenH3}>진행중인 프로젝트</h3>
      <div className={styles.projcets}>
        {progressingProjcets.map((project, index) => (
          <div className={styles.projects}>
            <h3 key={index}>{project.projectName}</h3>
            <ul>
              <li>매칭유형:{project.matchingType}</li>
              <li>매칭일시:{project.matchingTime}</li>
              <li>팀원 수:{project.teamMember}</li>
              <li>
                {
                  "모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다."
                }
              </li>
            </ul>
            <div className={styles.buttons}>
              <button>팀 공유방 바로가기</button>
              <button>프로젝트 진행 종료</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressingProjcetCard;
