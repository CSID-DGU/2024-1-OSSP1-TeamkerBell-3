import ApplyingResume from "./ApplyingResume";
import styles from "./ManageProject.module.css";
import TeamInfoCard from "./TeamInfoCard";

const LookingUpResume = ({ teamInfo, resumes }) => {
  // 공모전 카테고리 목록
  return (
    <div>
      <TeamInfoCard TeamInfo={teamInfo} />
      <div className={styles.resumeContainer}>
        {resumes.map((resume, index) => (
          <ApplyingResume key={index} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default LookingUpResume;
