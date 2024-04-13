import React from "react";
import styles from "./compmatching.module.css";
import CompDetail from "../components/mainComponents/CompDetail"; // CompDetail 컴포넌트 import



const CompMatching = () => {

    //공모전 상세 내용
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
        link:"https://github.com/CSID-DGU/2024-1-OSSP1-TeamkerBell-3.git"
    }

    return(
        <div className={styles.container}>
            
            <div className = {styles.compDetailContainer}>
                
                <CompDetail
                  image={DUMMY_COMP_DETAIL.image}
                  title={DUMMY_COMP_DETAIL.title}
                  period={DUMMY_COMP_DETAIL.period}
                  daycount = {DUMMY_COMP_DETAIL.daycount}
                  organization={DUMMY_COMP_DETAIL.organization}
                  theme={DUMMY_COMP_DETAIL.theme}
                  qualification={DUMMY_COMP_DETAIL.qualification}
                  apply={DUMMY_COMP_DETAIL.apply}
                  awards={DUMMY_COMP_DETAIL.awards}
                  inquiry={DUMMY_COMP_DETAIL.inquiry}
                  link={DUMMY_COMP_DETAIL.link}
                />
            </div>



        </div>


    );

}



export default CompMatching;
