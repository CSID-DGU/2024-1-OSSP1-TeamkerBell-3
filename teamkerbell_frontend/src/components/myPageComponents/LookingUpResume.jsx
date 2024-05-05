import styles from "./ManageProject.module.css";
import RecruitingProjectCard from "./RecruitingProjectCard";
import Resume from "./Resume";

const LookingUpResume = ({ recruitingProjects, resumes }) => {
  // 공모전 카테고리 목록
  return (
    <div>
      <RecruitingProjectCard recruitingProjects={recruitingProjects} />
      <div className={styles.resumeContainer}>
        {resumes.map((resume, index) => (
          <Resume key={index} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default LookingUpResume;
