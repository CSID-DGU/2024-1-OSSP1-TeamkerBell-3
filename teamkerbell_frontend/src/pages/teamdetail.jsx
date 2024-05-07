import React from "react";
import styles from "./teamdetail.module.css";
import TeamOutline from "../components/matchingComponents/TeamOutline";
import TeamSpecificDetail from "../components/matchingComponents/TeamSpecificDetail";
import {Link, useParams} from 'react-router-dom';



const TeamDetail = () => {

    const { compId, teamId } = useParams();

    const DUMMY_TEAM_OUTLINE = {
        title:"교보생명 대학생 디자인 공모전 팀원 구합니다!",
        profileimg:"../../../leadercrown.png",
        writer:"Danny",
        uploaddate:"2024.04.07",
        category:"공모전",
        meetingway:"온/오프라인",
        recruitnum:4,
        startdate:"2024.04.21",
        recruitjobs:["디자이너", "백엔드", "프론트엔드", "기획"],
        languages:["HTML", "CSS", "Django"],
        location:"서울"
    }

    const DUMMY_TEAM_DETAILS = {
        //프로젝트 소개
        intro:"함께 이번 공모전에 참가할 팀원을 모집하고 있습니다. 주제와 관련해서 어느정도 기반 지식을 가지고 계신 분이면 더욱 좋을 것 같습니다. 어느새 길어진 그림자를 따라서 땅거미진 어둠속을 그대와 걷고 있네요 차가워진 눈빛을 바라보며 이별의 말을 전해 들어요 아무 의미없던 노래 가사가 아프게 귓가에 맴돌아요. 다시 겨울이 시작되듯이 흩어지는 눈 사이로 그대 내 맘에 쌓여만 가네",
        
        //자격조건
        experience:1,
        baekjoontier:"D5+",
        requiredmajor:"상관없음",
        meetingtime:"월, 수, 금"
    }


    return(
        <div className={styles.container}>
            <div className = {styles.teamoutline}>
                <TeamOutline
                    title={DUMMY_TEAM_OUTLINE.title}
                    profileimg={DUMMY_TEAM_OUTLINE.profileimg}
                    writer={DUMMY_TEAM_OUTLINE.writer}
                    uploaddate={DUMMY_TEAM_OUTLINE.uploaddate}
                    category={DUMMY_TEAM_OUTLINE.category}
                    meetingway={DUMMY_TEAM_OUTLINE.meetingway}
                    recruitnum={DUMMY_TEAM_OUTLINE.recruitnum}
                    startdate={DUMMY_TEAM_OUTLINE.startdate}
                    recruitjobs={DUMMY_TEAM_OUTLINE.recruitjobs}
                    languages={DUMMY_TEAM_OUTLINE.languages}
                    location={DUMMY_TEAM_OUTLINE.location}
                />
            </div>

            <div className={styles.teamdetails}>
                <TeamSpecificDetail
                    intro={DUMMY_TEAM_DETAILS.intro}
                    experience={DUMMY_TEAM_DETAILS.experience}
                    baekjoontier={DUMMY_TEAM_DETAILS.baekjoontier}
                    requiredmajor={DUMMY_TEAM_DETAILS.requiredmajor}
                    meetingtime={DUMMY_TEAM_DETAILS.meetingtime}
                />
            </div>

            <div className={styles.button}>
                <Link to={`/comp/${compId}/teamList/${teamId}/apply`} className={styles.applybtn}>지원하기</Link>
                <Link to={`/comp/${compId}/teamList/${teamId}/leaderResume`} className={styles.leaderresumebtn}>팀장 이력서 조회</Link>
            </div>

        </div>
    );
}


export default TeamDetail;