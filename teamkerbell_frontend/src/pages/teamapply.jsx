import React, { useEffect } from "react";
import styles from "./teamapply.module.css";
import TeamOutline from "../components/matchingComponents/TeamOutline";
import Portfolios from "../components/myPageComponents/Potfolios";
import ApplyResume from "../components/matchingComponents/ApplyResume"; 
import SingleAndDoubleClick from "../components/matchingComponents/SingleAndDoubleClick";
import { Link ,useState } from 'react';
import { useParams } from "react-router-dom";
import { getMyResume, getTeamDetail, setApplyResume } from "../api/comp";



const TeamApply = ( ) => {

    const {compId, teamId, userId} = useParams();
    const [teamInfo, setTeamInfo] = useState({});
    const [memberRole, setMemberRole] = useState([]);
    const [myResumes, setMyResumes] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedResumeId, setSelectedResumeId] = useState(-1);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    console.log("teamInfo: ", teamInfo);
    console.log("memberRole: ", memberRole);
    console.log("myResumes: ", myResumes);
    console.log("input(role, reseumeId): ", selectedRole, selectedResumeId);


    useEffect(() => {
      const fetchSelectTeamApply = async () => {
        try {
          const response = await getMyResume(compId, teamId, userId);
          setTeamInfo(response.data.teamInfo)
          setMemberRole(response.data.selectRole);
          setMyResumes(response.data.resumeList);
          console.log(response.data);

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

      fetchSelectTeamApply();

    }, [compId, teamId]);


    const handleSelectRole = (e) => {
      setSelectedRole(e.target.value);
    }

    const handleSelectResume = (id) => {
        setSelectedResumeId(id);
    };

    //제출
    const handleApplyButton = async (e) => {
      e.preventDefault();
      if (!selectedRole || selectedResumeId < 0) {
        alert("모든 필드를 입력해주세요.");
        return;
      }
      try {
        console.log("compId, teamId, userId, selectedResumeId, selectedRole: ", compId, teamId, userId, selectedResumeId, selectedRole);
        await setApplyResume(compId, teamId, userId, selectedResumeId, selectedRole);
        alert("제출 완료되었습니다.");
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };


    return(
        <div className={styles.container}>
            {/* 팀 개요 */}
            <div className={styles.teamoutline}>
              <TeamOutline
                title={teamInfo.name}
                profileimg={DUMMY_TEAM_OUTLINE.profileimg} //프로필 이미지
                writer={teamInfo.leader}
                uploaddate={teamInfo.createdAt}
                meetingway={teamInfo.method}
                recruitnum={teamInfo.recruitNum}
                startdate={teamInfo.startDate}
                recruitjobs={teamInfo.role}
                languages={teamInfo.language}
                location={DUMMY_TEAM_OUTLINE.location} //활동 지역
              />
            </div>
            
            <hr className={styles.line}></hr>

            {/* 지원 */}
            <div className={styles.apply}>
              <div className={styles.applyfield}>
                <div className={styles.applyfieldtext}>지원 분야</div>
                <select className={styles.selectapplyfield} onChange={handleSelectRole} value={selectedRole}>
                <option value="" disabled>분야 선택</option>
                  {memberRole.map((member, index) => (
                    <option key={index} value={member.role} disabled={member.num === 0}>
                      {member.role} {member.num}명
                    </option>
                  ))}
    
                </select>
              </div>

              {/* 이력서 선택 */}
              <div className={styles.selectresumefield}>
                <div className={styles.selectresume}>이력서 선택</div>
                <div className={styles.resumeContainer}>

                  {DUMMY_RESUMES.map((resume) => (
                    <ApplyResume className={styles.resumeItem} 
                      key={resume.id}  
                      user={userId}
                      resume={resume} 
                      isSelected={selectedResumeId === resume.id} 
                      onSelect={handleSelectResume}/>
                  ))}
                </div>
              </div>

              <div className={styles.submit}>
                <button className={styles.submitbtn} onClick={handleApplyButton}>제출</button>
              </div>
              
            </div>

            

        </div>
    );
}
export default TeamApply;