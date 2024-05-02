import styles from "./ManageProject.module.css";

const ManageProject = ({
  progressingProjcets,
  recruitingProjects,
  applyingProjects,
}) => {
  // 공모전 카테고리 목록
  return (
    <div className={styles.container}>
      <h2>프로젝트 관리</h2>

      <div className={styles.competitionsContainer}>
        <h3 className={styles.colorGreenH3}>진행중인 프로젝트</h3>
        <div className={styles.projcets}>
          {progressingProjcets.map((project, index) => (
            <>
              <h3 key={index}>{project.projectName}</h3>
              <ul>
                <li>매칭유형:{project.matchingType}</li>
                <li>매칭일시:{project.matchingTime}</li>
                <li>팀원 수:{project.teamMember}</li>
                <li>
                  {
                    "(모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다.)"
                  }
                </li>
              </ul>
              <div className={styles.buttons}>
                <button>팀 공유방 바로가기</button>
                <button>프로젝트 진행 종료</button>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className={styles.competitionsContainer}>
        <h3 className={styles.colorGreenH3}>모집중인 프로젝트</h3>
        <div className={styles.projcets}>
          {recruitingProjects.map((project, index) => (
            <>
              <h3 key={index}>{project.projectName}</h3>
              <ul>
                <li>매칭유형:{project.matchingType}</li>
                <li>매칭일시:{project.matchingTime}</li>
                <li>팀원 수:{project.teamMember}</li>
                <li>
                  {
                    "(모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다.)"
                  }
                </li>
              </ul>
              <div className={styles.buttons}>
                <button>팀원 이력서 조회</button>
                <button>모집 취소</button>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className={styles.competitionsContainer}>
        <h3 className={styles.colorGreenH3}>신청한 프로젝트</h3>
        <div className={styles.projcets}>
          {applyingProjects.map((project, index) => (
            <>
              <h3 key={index}>{project.projectName}</h3>
              <ul>
                <li>매칭유형:{project.matchingType}</li>
                <li>매칭일시:{project.matchingTime}</li>
                <li>팀원 수:{project.teamMember}</li>
                <li>
                  {
                    "(모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다.)"
                  }
                </li>
              </ul>
              <div className={styles.buttons}>
                <button>팀 조회</button>
                <button>신청 취소</button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProject;
