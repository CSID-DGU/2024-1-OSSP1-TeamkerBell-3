import styles from "./TeamSpecificDetail.module.css"; // TeamOutline 컴포넌트의 스타일

//프로젝트 소개, 자격 조건에 대한 팀 세부 사항

const TeamSpecificDetail = ({intro, experience,baekjoontier, requiredmajor,meetingtime}) => {
    return (
        <div className={styles.teamspecificdetailcontainer}>
            <div className={styles.introductioncontainer}>
                <div className={styles.introductiontitle}>프로젝트 소개</div>
                <div className={styles.introductioncontent}>{intro}</div>
            </div>

            <div className={styles.qualificationcontainer}>
                <div className={styles.qualificationtitle}>자격 조건</div>
                <div className={styles.contents}>
                    <div className={styles.experience}>참여 이력: {experience}</div>
                    <div className={styles.baekjoontier}>백준 티어: {baekjoontier}</div>
                    <div className={styles.requiredmajor}>전공 유무: {requiredmajor}</div>
                    <div className={styles.meetingtime}>회의 시간: {meetingtime}</div>
                </div>
                
            </div>

        </div>

    );
}



export default TeamSpecificDetail;