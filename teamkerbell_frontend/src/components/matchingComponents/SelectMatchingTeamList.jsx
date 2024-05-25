import React from "react";
import styles from "./SelectMatchingTeamList.module.css";
import TeamCard from "./TeamCard";
import {Link, useParams} from 'react-router-dom';

const SelectMatchingTeamList = (teamlist) => {
    
    const { compId, userId } = useParams();
    console.log("[selectmatching component의 teamlist]:",teamlist);

    
    
    return(
        <div className={styles.SelectMatchingTeamListContainer}>
            <h2 className={styles.teamlistTitle}>모집 중인 팀 목록</h2>
            <Link to={`/comp/${compId}/createTeam/${userId}`} className={styles.createTeam}>팀 만들기</Link>

        
        <div className={styles.teamCards}>
            {teamlist.teamlist.map((team, index) => (
              <Link to={`/comp/${compId}/teamList/${team.id}/detail`} className={styles.teamlist}>
                <TeamCard
                  key={index}
                  image={team.image}
                  title={team.title}
                  writer={team.writer}
                  membernum={team.recruitnum}
                  startdate={team.startDate}
                  dday={team.star}
                  jobs={team.jobs}
                  languages={team.languages}
                />
              </Link>
            ))}
        </div>
        </div> 
    );

}

export default SelectMatchingTeamList;
