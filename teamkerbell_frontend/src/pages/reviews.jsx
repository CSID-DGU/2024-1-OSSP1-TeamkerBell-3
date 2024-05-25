import React, { useEffect, useState } from "react";
import styles from "./reviews.module.css";
import {Link, useParams} from 'react-router-dom';
import CompDetail from "../components/matchingComponents/CompDetail"; // CompDetail 컴포넌트 import
import ReviewCard from "../components/matchingComponents/ReviewCard"; // ReviewCard 컴포넌트 import
import { getCompDetail } from "../api/comp";


const CompReviews = () => {

    const { compId } = useParams();

    const [compDetail, setCompDetail] = useState(null);
    const [compReview, setCompReview] = useState([]);


    useEffect(() => {
        const fetchCompDetail = async () => {
          
            const response = await getCompDetail(compId);
            console.log(response)

            setCompDetail(response.data.compInfo);
            setCompReview(response.data.reviewList);
            
            console.log("compDetail: ",compDetail);
            console.log("compReview: ",compReview);
        };
    
        fetchCompDetail();
    
      }, [compId]);


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


    const DUMMY_COMP_REVIEWS = [
        "활용이 어떻게 되고 실현 가능한지를 많이 보는 듯해용",
        "아니 넘 많은 제출 서류가 필요해서 하시려면 각 잡고 제대로 해야할 듯ㅠㅠㅠ",
        "대학생은 거의 없고 현직자가 너무 많아요 후엥",
        "활용이 어떻게 되고 실현 가능한지를 많이 보는 듯해용",
        "아니 넘 많은 제출 서류가 필요해서 하시려면 각 잡고 제대로 해야할 듯ㅠㅠㅠ",
        "대학생은 거의 없고 현직자가 너무 많아요 후엥"
    ]

    return(
        <div className={styles.container}>
            
            {/* 공모전 상세 정보 */}
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

            {/* 공모전 후기 */}
            <div className = {styles.reviewContainer}>
                <hr className={styles.line}></hr>

                <div className = {styles.reviewHeader}>
                    <h2 className = {styles.reviewTitle}>공모전 후기</h2>
                    <div className={styles.backBtn}>
                        <img  src={"../../backarrow.svg"} alt="back" className={styles.back}/>
                        {/* 링크 수정 */}
                        <Link to = {`/comp/${compId}`} className = {styles.backwords}>뒤로 가기</Link> 
                    </div>
                    
                </div>
                
                
                <div className = {styles.reviews}>
                    {DUMMY_COMP_REVIEWS.map((review, index) => (
                      <ReviewCard
                        key={index}
                        review={review}
                      />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default CompReviews;
