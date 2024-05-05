import styles from "./ManageProject.module.css";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 상태

const RecruitingProjectCard = ({ recruitingProjects }) => {
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState); // Recoil 상태와 setter 함수 불러오기

  const lookingUpResumeHandler = () => {
    setCategoryNum(6); // Recoil을 통해 categoryNum 상태 업데이트
    console.log("[Recoil]categoryNum :", categoryNum);
  };

  return (
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
                  "모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다."
                }
              </li>
            </ul>
            <div className={styles.buttons}>
              <button onClick={lookingUpResumeHandler}>팀원 이력서 조회</button>
              <button>모집 취소</button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default RecruitingProjectCard;
