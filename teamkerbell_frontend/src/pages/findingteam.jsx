import React, { useEffect, useState } from "react";
import styles from "./findingteam.module.css"
import { Link, useParams } from "react-router-dom";
import TeamCard from "../components/matchingComponents/TeamCard";
import { getAllTeamList } from "../api/team";

const FindAllTeam = () => {

    const { compId } = useParams();   
    
    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const fetchAllTeamList = async () => {
          try {
            const response = await getAllTeamList();
            console.log(response.data);
            setTeamList(response.data);

            
    
            setIsLoading(false);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setIsError(true);
              setErrorMessage("현재 모집 중인 공모전 팀이 없어요!");
            } else {
              setIsError(true);
              setErrorMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
          }
        };
    
        fetchAllTeamList();
    
      });
    
    

    return(
        <div className = {styles.container}>
                <div className={styles.title}>빠른 팀 찾기</div>

                <div className={styles.list}>
                    {teamList.map((team, index) => (
                      <Link to={`/comp/${team.comp}/teamList/${team.id}/detail`} className={styles.teamlist}>
                        <TeamCard
                          key={index}
                          image={team.writerImg}
                          title={team.name}
                          writer={team.writer}
                          membernum={team.recruitNum}
                          startdate={team.startDate}
                          dday={(Math.floor((new Date().getTime()-new Date(team.startDate))/ (1000 * 60 * 60 * 24)))}
                          jobs={team.roleList}
                          languages={team.language}
                        />
                      </Link>
                    ))}
                </div>

        </div>


    );

}

export default FindAllTeam