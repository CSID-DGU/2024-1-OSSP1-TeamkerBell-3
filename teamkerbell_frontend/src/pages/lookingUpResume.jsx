import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import LookingUpResume from "../components/myPageComponents/LookingUpResume";
import { getTeamRecruitedResumes } from "../api/user";
import { useParams } from "react-router-dom";

const LookingUpResumePage = () => {
  const localStorageUserId = localStorage.getItem("userId");
  const { tid } = useParams();
  const [resumes, setResumes] = useState([]);
  const [teamInfo, setTeamInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchTeamResumes = async () => {
      // async 추가
      setIsLoading(true);

      try {
        const response = await getTeamRecruitedResumes(localStorageUserId, tid); // await 추가
        await setResumes(response.data.resumeList);
        await setTeamInfo(response.data.teamInfo);

        setResumes(response.data.resumeList);
        setTeamInfo(response.data.teamInfo);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setResumes([]);
        // 에러 처리 (예: 사용자에게 알림)
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamResumes(); // 함수 호출
  }, [localStorageUserId, tid]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {isLoading ? (
          <div>Loading...</div> // 로딩 중일 때 표시
        ) : (
          <LookingUpResume teamInfo={teamInfo} resumes={resumes} />
        )}
      </div>
    </div>
  );
};

export default LookingUpResumePage;
