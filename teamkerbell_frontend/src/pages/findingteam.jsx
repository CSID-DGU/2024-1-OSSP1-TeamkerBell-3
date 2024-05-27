import React from "react";
import styles from "./findingteam.module.css"
import { Link, useParams } from "react-router-dom";
import TeamCard from "../components/matchingComponents/TeamCard";

const FindAllTeam = () => {

    const { compId } = useParams();    


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
        <div className = {styles.container}>
                <div className={styles.title}>빠른 팀 찾기</div>

                <div className={styles.list}>
                    {DUMMY_TEAMLIST.map((team, index) => (
                      <Link to={`/comp/${compId}/teamList/${team.id}/detail`} className={styles.teamlist}>
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