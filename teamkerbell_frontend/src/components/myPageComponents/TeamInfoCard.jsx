import styles from "./ManageProject.module.css";
import { useNavigate } from "react-router-dom";
import { breakeTeam, compliteTeamMatching } from "../../api/user";

const TeamInfoCard = ({ TeamInfo }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  function recruitingButtonHandler() {
    navigate(`/comp/${TeamInfo.comp}/teamList/${TeamInfo.id}/detail`);
  }
  async function cancelRecruitngButtonHandler() {
    if (window.confirm("정말로 모집을 취소하시겠습니까?")) {
      try {
        const response = await breakeTeam(userId, TeamInfo.id); // API 호출
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

  async function completeTeamRecreutingButtonHandler(teamId) {
    const response = await compliteTeamMatching(userId, teamId);
    if (response.status == 200) {
      alert("팀 모집이 완료됐습니다!!");
    }
  }
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
          <div className={styles.buttons}>
            <button onClick={recruitingButtonHandler}>모집 글 보기</button>
            <button onClick={cancelRecruitngButtonHandler}>모집 취소</button>
          </div>
          <div className={styles.soloButtonContainer}>
            <button
              className={styles.endButton}
              onClick={() => completeTeamRecreutingButtonHandler(TeamInfo.id)}
            >
              모집 완료
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default TeamInfoCard;
