import ApplyingProjectCard from "./ApplyingProjectCard";
import styles from "./ManageProject.module.css";
import ProgressingProjcetCard from "./ProgressingProjectCard";
import RecruitingProjectCard from "./RecruitingProjectCard";

const ManageProject = ({
  progressingProjcets,
  recruitingProjects,
  applyingProjects,
}) => {
  return (
    <div className={styles.container}>
      <h2>프로젝트 관리</h2>
      <ProgressingProjcetCard progressingProjcets={progressingProjcets} />
      <RecruitingProjectCard recruitingProjects={recruitingProjects} />
      <ApplyingProjectCard applyingProjects={applyingProjects} />
    </div>
  );
};

export default ManageProject;
