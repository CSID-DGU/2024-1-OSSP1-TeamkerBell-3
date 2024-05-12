import React, { useState } from "react";
import styles from "./RandomMatchingQuestion.module.css"
import RegionSelector from "./RegionSelector";
import { useParams } from "react-router-dom";

const RandomMatchingQuestion = () => {

    const [isLeader, setLeader] = useState(true);
    const [selectedRole, setRole] = useState("");
    const [isAgree, setAgree] = useState(false); 

    const {city, district} = useParams();
    //출력 확인용 console.log(city,district);


    const selectLeader = () => {
        setLeader(true);
        console.log("리더형 선택");
    };
    const selectSupporter = () => {
        setLeader(false);
        console.log("서포터형 선택");
    };

    const handleRole = (role) => {
        setRole(role)
        console.log(role);
    }

    const handleRecruitNum = (e) => {
        var recruit=e.target.value;
        console.log("모집 인원", recruit);
    }

    const handleCheck = () => {
        isAgree? (setAgree(false)):(setAgree(true));


    }
    console.log("동의 여부", isAgree);

    const handleApply = () => {
        isAgree? alert("매칭 신청 완료되었습니다."):alert("위의 사항을 확인하고 동의 후에 이용해주시기 바랍니다.");
    }



    const DUMMY_ROLE_LIST = ["기획", "디자인", "프론트엔드", "백엔드"];

    return(
        <div className={styles.container}>
            <div className={styles.leader}>
                <div className={styles.leaderquestion}>이번 프로젝트에서 어떤 역할을 맡고 싶으신가요?</div>
                <div className={styles.selectbtn}>
                    <button onClick = {selectLeader} className={isLeader ? `${styles.leaderbtn} ${styles.active}` : styles.leaderbtn}>리더형</button>
                    <button onClick = {selectSupporter} className={!isLeader ? `${styles.supporterbtn} ${styles.active}` : styles.supporterbtn}>서포터형</button>
                </div>
                <div className={styles.leaderimg}>
                    {isLeader? (
                        <img src="/leader.png" alt="리더"/>
                    ):(
                        <img src="/supporter.png" alt="서포터"/>
                    )}
                </div>
            </div>

            <div className={styles.question}>
        
                <div className={styles.location}>
                    <div className={styles.locationquestion}>1.프로젝트 진행 중 활동할 수 있는 지역은 어디인가요?</div>
                    <RegionSelector className={styles.regionselector}/>
                </div>

                <div className={styles.roles}>
                    <div className={styles.rolequestion}>2. 이번 프로젝트에서 어떤 분야로 활동하고 싶나요?</div>
                    {DUMMY_ROLE_LIST.map((role, index) => (
                        <button className={selectedRole === role ? `${styles.rolebtn} ${styles.active}` : styles.rolebtn} key={index} onClick={() => handleRole(role)}>{role}</button>

                    ))}
                </div>

                
                {isLeader && 
                    <div className={styles.recruitnum}>
                     <div className={styles.recruitnumquestion}>3. 몇 명의 팀원을 모집할까요?</div>
                     <input id="recruitnuminput" className={styles.recruitnuminput} placeholder="팀원 수 입력(본인 포함)" onChange={handleRecruitNum}></input>
                    </div>
                }

                <div className={styles.check}>
                    <input type="checkbox" id="checkbox" className={styles.checkbtn} onClick={handleCheck}/>
                    <div className="checktext">취소할 경우 불이익이 있을 수 있음을 확인하였으며, 위에 내용에 대해 동의합니다.</div>
                </div>



            </div>

            <button className={styles.applybtn} onClick={handleApply}>매칭 시작</button>
        

        </div>
        
    );
}

export default RandomMatchingQuestion;