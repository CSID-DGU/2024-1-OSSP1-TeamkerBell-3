import React, { useCallback, useEffect } from "react";
import styles from "./createteam.module.css";
import CompDetail from "../components/matchingComponents/CompDetail";
import { useState } from "react";
import RecruitNumInput from "../components/matchingComponents/RecruitNumInput";
import ApplyResume from "../components/matchingComponents/ApplyResume";
import { getCompDetail, setSelectTeam } from "../api/comp";
import { useParams } from "react-router-dom";

const CreateTeam = () => {
    const {compId, userId} = useParams();
    const [compDetail, setCompDetail] = useState(null); //공모전 상세 정보


    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const DUMMY_COMP_DETAIL = {
        image: "../../comp_example.jpeg",
        title: "생성형 AI 이미지 활용 공모전",
        period: "2024.03.11 ~ 2024.05.17",
        daycount: "D-40",
        organization: "에프엔가이드",
        theme: "생성형 AI 이미지",
        qualification: "예비 창업자, 3년 미만 스타트업",
        apply: "온라인 지원",
        awards: ["1등 -  10,000,000원", "2등 - 5,000,000원", "3등 - 1,000,000원"],
        inquiry: "teamkerbell@dongguk.edu",
        link: "https://github.com/CSID-DGU/2024-1-OSSP1-TeamkerBell-3.git",
    };

    const DUMMY_METHOD_LIST = ["대면","비대면","대면/비대면", "상관 없음"];

  

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

    
    /* console.log(title);
    console.log(selectedMethod);
    console.log("동의 여부", isAgree);
    console.log(projectStartDate);
    console.log(selectedResumeId);
    console.log(qualification);
    console.log(language);
    console.log(selectedResumeId);
    console.log(intro);
    console.log("compDetail: ",compDetail);
    console.log("recruitRole", recruitRole);
    console.log("recruitNum", recruitNum); */

    console.log("recruitRole, recruitNum, projectStartDate, intro, selectedMethod, language, qualification, selectedResumeId: ", recruitRole, recruitNum, projectStartDate, intro, selectedMethod, language, qualification, selectedResumeId);
    console.log("title:",title, typeof(title));
    console.log("recruitRole:",recruitRole, typeof(recruitRole));
    console.log("recruitNum:",recruitNum, typeof(recruitNum));
    console.log("projectStartDate:",projectStartDate, typeof(projectStartDate));
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
          setCompDetail(response.data.compInfo);
  
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
        await setSelectTeam(recruitRole, recruitNum, projectStartDate, title, intro, selectedMethod, language, qualification, selectedResumeId);
        alert("제출 완료되었습니다.");
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };


    return(
        <div className={styles.container}>
            <div className={styles.compdetail}>
            {/* <CompDetail
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
            /> */}
            
            {/* 자꾸 결과 변경 */}
            <CompDetail
              image={DUMMY_COMP_DETAIL.image}
              title={DUMMY_COMP_DETAIL.title}
              period={DUMMY_COMP_DETAIL.period}
              daycount={DUMMY_COMP_DETAIL.daycount}
              organization={DUMMY_COMP_DETAIL.organization}
              theme={DUMMY_COMP_DETAIL.theme}
              qualification={DUMMY_COMP_DETAIL.qualification}
              apply={DUMMY_COMP_DETAIL.apply}
              awards={DUMMY_COMP_DETAIL.awards}
              inquiry={DUMMY_COMP_DETAIL.inquiry}
              link={DUMMY_COMP_DETAIL.link}
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
                          {DUMMY_METHOD_LIST.map((method, index) => (
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

                        {DUMMY_RESUMES.map((resume) => (
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