import styles from "./TeamOutline.module.css"; // TeamOutline 컴포넌트의 스타일
import { useParams, Link } from "react-router-dom";

const TeamOutline = ({
  title,
  writer,
  uploaddate,
  meetingway,
  recruitnum,
  startdate,
  recruitjobs,
  languages,
  location,
}) => {
  const { compId } = useParams();

  return (
    <div className={styles.teamoutlinecontainer}>
      <div className={styles.backBtn}>
        <img src={"/backarrow.svg"} alt="back" className={styles.back} />
        <Link to={`/comp/${compId}`} className={styles.backwords}>
          뒤로 가기
        </Link>
      </div>

      <div className={styles.title}>
        <h1>{title}</h1>
      </div>

      <div className={styles.header}>
        <div className={styles.writer}>{writer}</div>
        <div className={styles.uploaddate}>{uploaddate}</div>
        {/* 찜하기 기능 추가*/}
      </div>

      <div className={styles.description}>
        <div className={styles.meetingway}>진행 방식: {meetingway}</div>
        <div className={styles.recruitnum}>모집 인원: {recruitnum}</div>
        <div className={styles.startdate}>시작 날짜: {startdate}</div>
        <div className={styles.location}>활동 지역: {location}</div>

        <div className={styles.languages}>          
          <div>사용 언어: {languages}</div>
          
        </div>
        <div className={styles.recruitjobs}>
          모집 분야:{recruitjobs}
          {/* MAP 오류 발생) {recruitjobs.map((job) => (
            <div key={job}>{job}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TeamOutline;
