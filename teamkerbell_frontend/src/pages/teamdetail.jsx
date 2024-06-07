import React, { useEffect, useState } from "react";
import styles from "./teamdetail.module.css";
import TeamOutline from "../components/matchingComponents/TeamOutline";
import TeamSpecificDetail from "../components/matchingComponents/TeamSpecificDetail";
import { Link, useParams } from "react-router-dom";
import { getTeamDetail } from "../api/comp";

const TeamDetail = () => {
  const { compId, teamId } = useParams();
  const [teamDetail, setTeamDetail] = useState({});
  const userId = localStorage.getItem("userId");

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  console.log("teamdetail: ", teamDetail);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await getTeamDetail(compId, teamId);
        setTeamDetail(response.data)
        
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsError(true);
          setErrorMessage("선택한 공모전의 팀이 없어요!");
        } else {
          setIsError(true);
          setErrorMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    };

    fetchTeamDetail();

  }, [compId, teamId]);


  return (
    <div className={styles.container}>
      <div className={styles.teamoutline}>
        <TeamOutline
          title={teamDetail.name}
          writer={teamDetail.leader}
          uploaddate={teamDetail.createdAt}
          meetingway={teamDetail.method}
          recruitnum={teamDetail.recruitNum}
          startdate={teamDetail.startDate}
          recruitjobs={teamDetail.role}
          languages={teamDetail.language}
          location={teamDetail.city+" "+teamDetail.dong}
        />
      </div>

      <div className={styles.teamdetails}>
        <TeamSpecificDetail
          intro={teamDetail.intro}
          experience={teamDetail.qualification}
          
        />
      </div>

      <div className={styles.button}>
        <Link
          to={`/comp/${compId}/teamList/${teamId}/apply/${userId}`}
          className={styles.applybtn}
        >
          지원하기
        </Link>
        <Link
          to={`/comp/${compId}/teamList/${teamId}/leaderResume`}
          className={styles.leaderresumebtn}
        >
          팀장 이력서 조회
        </Link>
      </div>
    </div>
  );
};

export default TeamDetail;
