import React, { useCallback, useEffect } from "react";
import styles from "./createteam.module.css";
import CompDetail from "../components/matchingComponents/CompDetail";
import { useState } from "react";
import RecruitNumInput from "../components/matchingComponents/RecruitNumInput";
import ApplyResume from "../components/matchingComponents/ApplyResume";
import { getCompDetail, getMyResume, getMyResumeForCreateTeam, setSelectTeam } from "../api/comp";
import { useNavigate, useParams } from "react-router-dom";

const CreateTeam = () => {
    const {compId} = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [compDetail, setCompDetail] = useState({}); //공모전 상세 정보
    const [myResumes, setMyResumes] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const METHOD_LIST = ["대면","비대면","대면/비대면", "상관 없음"];

    //사용자 입력용 상태
    const [title, setTitle] = useState("");
    const [recruitRole, setRecruitRole] = useState([]);
    const [recruitNum, setRecruitNum] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [intro, setIntro] = useState("");
    const [projectStartDate, setProjectStartDate] = useState("");
    const [selectedResumeId, setSelectedResumeId] = useState(-1);
    const [language, setLanguage] = useState("");
    const [qualification, setQualification] = useState("");
    const [isAgree, setAgree] = useState(false); 


    console.log("title:",title, typeof(title));
    console.log("recruitRole:",recruitRole, typeof(recruitRole));
    console.log("recruitNum:",recruitNum, typeof(recruitNum));
    console.log("projectStartDate:",projectStartDate, typeof(projectStartDate));
    console.log("myResumes: ", myResumes);
    console.log("selectedResumeId:",selectedResumeId, typeof(selectedResumeId));




    const handleMethod = (method) => {
        setSelectedMethod(method)

    }

    const handleCheck = () => setAgree(!isAgree);
    
    const handleSelectResume = (id) => {
        setSelectedResumeId(id);
    };

    // RecruitNumInput에서 전달받은 데이터를 처리하는 함수
    const handleRoleAndRecruitNumChange = useCallback((roleAndRecruitNum) => {
      const roles = Object.keys(roleAndRecruitNum);
      const recruitNums = Object.values(roleAndRecruitNum);
  
      setRecruitRole(roles);
      setRecruitNum(recruitNums);
  }, []);


    useEffect(() => {
      const fetchCompDetail = async () => {
        try {
          const response = await getCompDetail(compId);
          const response1 = await getMyResumeForCreateTeam(compId, userId);
          console.log(response1.data);
          setCompDetail(response.data.compInfo);
          setMyResumes(response1.data)
          
  
          setIsLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setIsError(true);
            setErrorMessage("선택한 공모전이 없어요!");
          } else {
            setIsError(true);
            setErrorMessage("An unexpected error occurred.");
          }
          setIsLoading(false);
        }
      };
  
      fetchCompDetail();
  
    }, [compId]);


    //제출
    const handleApplyButton = async (e) => {
      e.preventDefault();
      if (!title || !recruitRole || !recruitNum || !projectStartDate || !intro || !selectedMethod || !qualification || !isAgree || selectedResumeId < 0 || !language) {
        alert("모든 필드를 입력해주세요.");
        return;
      }
      try {
        console.log("recruitRole, recruitNum, projectStartDate, intro, selectedMethod, language, qualification, selectedResumeId: ", recruitRole, recruitNum, projectStartDate, intro, selectedMethod, language, qualification, selectedResumeId);
        await setSelectTeam(compId, userId, recruitRole, recruitNum, projectStartDate, title, intro, selectedMethod, language, qualification, selectedResumeId);
        alert("제출 완료되었습니다.");
        navigate(`/user/${userId}/mypage/projects`)
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };


    return(
        <div className={styles.container}>
            <div className={styles.compdetail}>
            <CompDetail
              image={compDetail.img}
              title={compDetail.name}
              period={compDetail.startDate+"~"+compDetail.endDate}
              daycount={(Math.floor((new Date(compDetail.endDate)-new Date().getTime())/ (1000 * 60 * 60 * 24)))}
              organization={compDetail.organization}
              theme={compDetail.theme}
              qualification={compDetail.eligibillty}
              apply={compDetail.applicationMethod}
              awards={compDetail.reward}
              inquiry={compDetail.contact}
              link={compDetail.link}
            />
            
            </div>

            <div className={styles.createteam}>
                <div className={styles.createteamtext}>
                    팀 만들기
                </div>

                <div className={styles.question}>
                    <div className={styles.posttitle}>
                        <div className={styles.qtext}>1. 모집 게시글 제목</div>
                        <input className={styles.titleinput} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="게시글 제목 입력"></input>
                    </div>

                    <div className={styles.recruitnum}>
                        <div className={styles.qtext}>2. 총 모집 인원 및 모집 분야</div>
                        <RecruitNumInput onRoleAndRecruitNumChange={handleRoleAndRecruitNumChange}/>
                    </div>

                    <div className={styles.startdate}>
                        <div className={styles.qtext}>3. 프로젝트 시작 날짜 입력</div>
                        <input className={styles.startdateinput} type="date" placeholder="날짜 입력(년/월/일)" value={projectStartDate} onChange={(e) => setProjectStartDate(e.target.value)}></input>
                    </div>

                    <div className={styles.introduction}>
                        <div className={styles.qtext}>4. 프로젝트 소개</div>
                        <input className={styles.introductioninput} placeholder="내용 입력" value={intro} onChange={(e)=>setIntro(e.target.value)}></input>
                    </div>
                    
                    <div className={styles.method}>
                        <div className={styles.qtext}>5. 프로젝트 진행 방식</div>
                        <div className={styles.methodbtns}>
                          {METHOD_LIST.map((method, index) => (
                              <button className={selectedMethod === method ? `${styles.methodbtn} ${styles.active}` : styles.methodbtn} key={index} onClick={() => handleMethod(method)}>{method}</button>
                          ))}
                        </div>
                        
                    </div>

                    <div className={styles.language}>
                        <div className={styles.qtext}>6. 사용 언어</div>
                        <input className={styles.languageinput} placeholder="사용 언어 입력" value={language} onChange={(e) => setLanguage(e.target.value)}></input>
                    </div>

                    <div className={styles.qualification}>
                        <div className={styles.qtext}>7. 자격 조건</div>
                        <input className={styles.qualificationinput} placeholder="내용 입력" value={qualification} onChange={(e) => setQualification(e.target.value)}></input>
                    </div>

                    {/* 이력서 선택 */}
                    <div className={styles.selectresumefield}>
                      <div className={styles.qtext}>8. 이력서 선택</div>
                      <div className={styles.resumeContainer}>

                        {myResumes.map((resume) => (
                          <ApplyResume className={styles.resumeItem} 
                            key={resume.id}  
                            user={userId}
                            resume={resume} 
                            isSelected={selectedResumeId === resume.id} 
                            onSelect={handleSelectResume}/>
                        ))}
                      </div>

                      <div className={styles.qtext}>9. 선택 매칭을 신청할까요?</div>
                      <div className={styles.check}>
                        <input type="checkbox" id="checkbox" className={styles.checkbtn} onClick={handleCheck}/>
                        <div className={styles.checktext}>취소할 경우 불이익이 있을 수 있음을 확인하였으며, 위에 내용에 대해 동의합니다.</div>
                    </div>

                  </div>

                </div>
            </div>

            <button className={styles.applybtn} onClick={handleApplyButton}>매칭 시작</button>

        </div>
    );


}




export default CreateTeam;