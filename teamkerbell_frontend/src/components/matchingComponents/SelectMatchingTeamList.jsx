import React from "react";
import styles from "./SelectMatchingTeamList.module.css";
import TeamCard from "./TeamCard";
import {Link, useParams} from 'react-router-dom';

const SelectMatchingTeamList = () => {
    
    const { compId, teamId } = useParams();

    // 팀 목록 데이터
    const DUMMY_TEAMLIST = [
        {
          id: 0,
          image: "../../Male User.png",
          title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
          writer: "danny",
          membernum: 4,
          startdate:"24.04.21",
          dday:1,
          jobs: "프론트엔드, 백엔드, 기획, 디자인",
          languages: "HTML, CSS, Django"
        },

        {
            id: 1,
            image: "../../Male User.png",
            title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
            writer: "danny",
            membernum: 4,
            startdate:"24.04.21",
            dday:1,
            jobs: "프론트엔드, 백엔드, 기획, 디자인",
            languages: "HTML, CSS, Django"
        },

        {
            id: 2,
            image: "../../Male User.png",
            title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
            writer: "danny",
            membernum: 4,
            startdate:"24.04.21",
            dday:1,
            jobs: "프론트엔드, 백엔드, 기획, 디자인",
            languages: "HTML, CSS, Django"
        },

        {
            id: 3,
            image: "../../Male User.png",
            title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
            writer: "danny",
            membernum: 4,
            startdate:"24.04.21",
            dday:1,
            jobs: "프론트엔드, 백엔드, 기획, 디자인",
            languages: "HTML, CSS, Django"
        },

        {
            id: 4,
            image: "../../Male User.png",
            title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
            writer: "danny",
            membernum: 4,
            startdate:"24.04.21",
            dday:1,
            jobs: "프론트엔드, 백엔드, 기획, 디자인",
            languages: "HTML, CSS, Django"
        },

    ];
    
    return(
        <div className={styles.SelectMatchingTeamListContainer}>
            <h2 className={styles.teamlistTitle}>모집 중인 팀 목록</h2>
            <Link to={`/comp/${compId}/createTeam`} className={styles.createTeam}>팀 만들기</Link>

        
        <div className={styles.teamCards}>
            {DUMMY_TEAMLIST.map((team, index) => (
              <Link to={`/comp/${compId}/teamList/${team.id}/detail`} className={styles.teamlist}>
                <TeamCard
                  key={index}
                  image={team.image}
                  title={team.title}
                  writer={team.writer}
                  membernum={team.membernum}
                  startdate={team.startdate}
                  dday={team.dday}
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
