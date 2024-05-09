import React from "react";
import styles from "./teamapply.module.css";
import TeamOutline from "../components/matchingComponents/TeamOutline";
import Portfolios from "../components/myPageComponents/Potfolios";
import ApplyResume from "../components/matchingComponents/ApplyResume"; 
import SingleAndDoubleClick from "../components/matchingComponents/SingleAndDoubleClick";
import { Link ,useState } from 'react';



const TeamApply = ( ) => {

    //유저 ID
    const DUMMY_USER_ID = 3;

    const DUMMY_TEAM_OUTLINE = {
        title: "교보생명 대학생 디자인 공모전 팀원 구합니다!",
        profileimg: "/Male User.png",
        writer: "Danny",
        uploaddate: "2024.04.07",
        category: "공모전",
        meetingway: "온/오프라인",
        recruitnum: 4,
        startdate: "2024.04.21",
        recruitjobs: ["디자이너", "백엔드", "프론트엔드", "기획"],
        languages: ["HTML", "CSS", "Django"],
        location: "서울",
      };

    const DUMMY_TEAM_MEMBER={
        design: 1,
        frontend: 2,
        backend: 2,
        pm: 0
    };


    const DUMMY_RESUMES = [
      {
        id:0,
        temperature: 42.5,
        title: "규진's 이력서",
        content:
          "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
        name: "홍규진",
        age: 24,
        occupation: "프론트엔드 개발/백엔드 개발",
        skills: "JavaScript, React, Django, Flutter",
        baekjoonTier: "Gold",
        github: "github.com/kyujenius",
        tags: [0, 1, 2, 3],
      },

      {
        id:1,
        temperature: 42.5,
        title: "규진's 이력서",
        content:
          "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
        name: "홍규진",
        age: 24,
        occupation: "프론트엔드 개발/백엔드 개발",
        skills: "JavaScript, React, Django, Flutter",
        baekjoonTier: "Gold",
        github: "github.com/kyujenius",
        tags: [0, 1, 2, 3],
      },

      {
        id:2,
        temperature: 42.5,
        title: "규진's 이력서",
        content:
          "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
        name: "홍규진",
        age: 24,
        occupation: "프론트엔드 개발/백엔드 개발",
        skills: "JavaScript, React, Django, Flutter",
        baekjoonTier: "Gold",
        github: "github.com/kyujenius",
        tags: [0, 1, 2, 3],
      },
      
      {
        id:3,
        temperature: 42.5,
        title: "규진's 이력서",
        content:
          "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
        name: "홍규진",
        age: 24,
        occupation: "프론트엔드 개발/백엔드 개발",
        skills: "JavaScript, React, Django, Flutter",
        baekjoonTier: "Gold",
        github: "github.com/kyujenius",
        tags: [0, 1, 2, 3],
      },
    ];


    //지원 분야 상태 관리
    const [selectedRole, setSelectedRole] = useState("");

    const handleSelectRole = (e) => {
      setSelectedRole(e.target.value);
      console.log("선택된 지원 분야: "+e.target.value);
    }


    //이력서 상태 관리
    const [selectedResumeId, setSelectedResumeId] = useState(null);

    const handleSelectResume = (id) => {
        setSelectedResumeId(id);
    };



    return(
        <div className={styles.container}>
            {/* 팀 개요 */}
            <div className={styles.teamoutline}>
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
            
            <hr className={styles.line}></hr>

            {/* 지원 */}
            <div className={styles.apply}>
              <div className={styles.applyfield}>
                <div className={styles.applyfieldtext}>지원 분야</div>
                <select className={styles.selectapplyfield} onChange={handleSelectRole} value={selectedRole}>
                  <option value="" disabled selected>분야 선택</option>
                  <option value="design" disabled={DUMMY_TEAM_MEMBER.design === 0}>디자인 {DUMMY_TEAM_MEMBER.design}명</option>
                  <option value="frontend" disabled={DUMMY_TEAM_MEMBER.frontend === 0}>프론트엔드 {DUMMY_TEAM_MEMBER.frontend}명</option>
                  <option value="backend" disabled={DUMMY_TEAM_MEMBER.backend === 0}>백엔드 {DUMMY_TEAM_MEMBER.backend}명</option>
                  <option value="pm" disabled={DUMMY_TEAM_MEMBER.pm === 0}>기획 {DUMMY_TEAM_MEMBER.pm}명</option>
                </select>
              </div>

              {/* 이력서 선택 */}
              <div className={styles.selectresumefield}>
                <div className={styles.selectresume}>이력서 선택</div>
                <div className={styles.resumeContainer}>

                  {DUMMY_RESUMES.map((resume) => (
                    <ApplyResume className={styles.resumeItem} 
                      key={resume.id}  
                      user={DUMMY_USER_ID}
                      resume={resume} 
                      isSelected={selectedResumeId === resume.id} 
                      onSelect={handleSelectResume}/>
                  ))}
                </div>
              </div>

              <div className={styles.submit}>
                <div className={styles.submitbtn}>제출</div>
              </div>
              
            </div>

            

        </div>
    );
}
export default TeamApply;