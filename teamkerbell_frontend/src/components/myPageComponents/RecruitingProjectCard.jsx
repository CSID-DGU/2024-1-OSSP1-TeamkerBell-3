import styles from "./ManageProject.module.css";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 상태
import { useNavigate } from "react-router-dom";
import { breakeTeam } from "../../api/user";

const RecruitingProjectCard = ({ recruitingProjects }) => {
  const navigate = useNavigate();
  const localStorageUserId = localStorage.getItem("userId");
  const lookingUpResumeHandler = (id) => {
    navigate(`/user/${localStorageUserId}/mypage/team/${id}`);
  };

  async function cancelRecruitngButtonHandler(teamId) {
    if (window.confirm("정말로 모집을 취소하시겠습니까?")) {
      try {
        const response = await breakeTeam(localStorageUserId, teamId); // API 호출
        if (response.status === 200) {
          // 성공적으로 취소된 경우 처리 (예: 페이지 새로고침, 상태 업데이트 등)
          alert("모집이 취소되었습니다.");
        } else {
          alert("모집 취소에 실패했습니다.");
        }
      } catch (error) {
        console.error("모집 취소 중 오류 발생:", error);
        alert("모집 취소 중 오류가 발생했습니다.");
      }
    }
  }
  return (
    <div className={styles.competitionsContainer}>
      <h3 className={styles.colorGreenH3}>모집중인 프로젝트</h3>
      <div className={styles.projcets}>
        {recruitingProjects.map((project, index) => (
          <>
            <h3 key={index}>{project.compTitle}</h3>
            <ul>
              <li>매칭 유형: {project.isRandom ? "랜덤 매칭" : "선택 매칭"}</li>
              <li>매칭일시:{project.startDate}</li>
              <li>팀원 수:{project.recruitNum}</li>
              <li>
                {
                  "모든 팀원이 프로젝트 종료를 누를 경우, 프로젝트가 종료됩니다."
                }
              </li>
            </ul>
            <div className={styles.buttons}>
              <button onClick={() => lookingUpResumeHandler(project.id)}>
                팀원 이력서 조회
              </button>
              <button onClick={() => cancelRecruitngButtonHandler(project.id)}>
                모집 취소
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default RecruitingProjectCard;
