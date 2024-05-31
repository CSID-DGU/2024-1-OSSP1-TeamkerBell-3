import React, { useEffect, useState } from "react";
import ResumeSummary from "../components/matchingComponents/ResumeSummary"
import styles from "./leaderresume.module.css";
import {Link, useParams} from "react-router-dom"
import { getLeaderResume } from "../api/comp";


const LeaderResume = () => {

    const { compId, teamId } = useParams();

    const [leaderResume, setLeaderResume] = useState({});
    const [postTitle, setPostTitle] = useState("");
    const ROLE = "팀장"

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const fetchLeaderResume = async () => {
          try {
            const response = await getLeaderResume(compId, teamId);
            console.log("response: ",response);
            setLeaderResume(response.data.resumeInfo);
            setPostTitle(response.data.postTitle);
    
            setIsLoading(false);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setIsError(true);
              setErrorMessage("선택한 팀장의 이력서가 없어요!");
            } else {
              setIsError(true);
              setErrorMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
          }
        };
    
        fetchLeaderResume();
    
      }, [compId, teamId]);




    return(
        <div className={styles.container}>
            <div className={styles.backBtn}>
                <img src={"/backarrow.svg"} alt="back" className={styles.back} />
                <Link to={`/comp/${compId}/teamList/${teamId}/detail`} className={styles.backwords}>
                뒤로 가기
                </Link>
            </div>

            <div className={styles.title}>{postTitle}</div>

            <ResumeSummary
                content={leaderResume}
                role={"팀장"}
            />
            
            <div className={styles.box}>

                <div className={styles.introduction}>
                    <div className={styles.text}>자기 소개</div>
                    <div className={styles.content}>{leaderResume.userIntro}</div>
                </div>

                <div className={styles.stack}>
                    <div className={styles.text}>기술 스택</div>
                    <div className={styles.content}>{leaderResume.skill}</div>
                </div>

                <div className={styles.history}>
                    <div className={styles.text}>프로젝트 경험</div>
                    <div className={styles.content}>{leaderResume.experience}</div>
                </div>

                <div className={styles.github}>
                    <div className={styles.text}>Github</div>
                    <div className={styles.content}>{leaderResume.githubLink}</div>
                </div>

                <div className={styles.sns}>
                    <div className={styles.text}>기타 SNS(Instagram, Facebook, T-story 등)</div>
                    <div className={styles.content}>{leaderResume.snsLink}</div>
                </div>

            </div>  

        </div>
    );

}


export default LeaderResume;