import React, { useEffect } from "react";
import styles from "./teamapply.module.css";
import TeamOutline from "../components/matchingComponents/TeamOutline";
import Portfolios from "../components/myPageComponents/Potfolios";
import ApplyResume from "../components/matchingComponents/ApplyResume"; 
import SingleAndDoubleClick from "../components/matchingComponents/SingleAndDoubleClick";
import { Link ,useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getMyResume, getTeamDetail, setApplyResume } from "../api/comp";



const TeamApply = ( ) => {

    const {compId, teamId} = useParams();
    const userId = localStorage.getItem("userId");
    const [teamInfo, setTeamInfo] = useState({});
    const [memberRole, setMemberRole] = useState([]);
    const [myResumes, setMyResumes] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedResumeId, setSelectedResumeId] = useState(-1);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate= useNavigate();

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

    }, [compId, teamId, userId]);


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
        console.log("Submitting application with:", {
          compId,
          teamId,
          userId,
          resumeId: selectedResumeId,
          role: selectedRole,
      });
        console.log("selectedResumeId, selectedRole: ", selectedResumeId, selectedRole);
        await setApplyResume(compId, teamId, userId, selectedResumeId, selectedRole);
        alert("제출 완료되었습니다.");
        navigate(`/user/${userId}/mypage/projects`);

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
                writer={teamInfo.leader}
                uploaddate={teamInfo.createdAt}
                meetingway={teamInfo.method}
                recruitnum={teamInfo.recruitNum}
                startdate={teamInfo.startDate}
                recruitjobs={teamInfo.role}
                languages={teamInfo.language}
                location={teamInfo.city+" "+teamInfo.dong} //활동 지역
              />
            </div>
            
            <hr className={styles.line}></hr>

            {/* 지원 */}
            <div className={styles.apply}>
              <div className={styles.applyfield}>
                <div className={styles.applyfieldtext}>지원 분야</div>
                <select className={styles.selectapplyfield} onChange={handleSelectRole} value={selectedRole}>
                <option value="" disabled>분야 선택</option>
                  {memberRole.filter(member => member.role !== '팀장').map((member, index) => (
                    <option key={index} value={member.role} disabled={member.num === member.recruitNum}>
                      {member.role} {member.recruitNum-member.num}명
                    </option>
                  ))}
    
                </select>
              </div>

              {/* 이력서 선택 */}
              <div className={styles.selectresumefield}>
                <div className={styles.selectresume}>이력서 선택</div>
                <div className={styles.resumeContainer}>

                  {myResumes.map((resume, index) => (
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