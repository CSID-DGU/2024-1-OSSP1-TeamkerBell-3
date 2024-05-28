import React, { useEffect, useState } from "react";
import styles from "./reviews.module.css";
import {Link, useParams} from 'react-router-dom';
import CompDetail from "../components/matchingComponents/CompDetail"; // CompDetail 컴포넌트 import
import ReviewCard from "../components/matchingComponents/ReviewCard"; // ReviewCard 컴포넌트 import
import { getReviewList } from "../api/comp";


const CompReviews = () => {

    const { compId } = useParams();
    const [compDetail, setCompDetail] = useState({}); //null 안됨
    const [compReview, setCompReview] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    

    useEffect(() => {

        const fetchCompReviews = async () => {

            try{
                const response = await getReviewList(compId);
                console.log(response)
        
                setCompDetail(response.data.compInfo);
                setCompReview(response.data.reviewList);
    

                setIsLoading(false);

            } catch(error) {
                if (error.response && error.response.status === 404) {
                    setIsError(true);
                    setErrorMessage("선택한 공모전의 리뷰가 없어요!");
                  } else {
                    setIsError(true);
                    setErrorMessage("An unexpected error occurred.");
                  }
                  setIsLoading(false);
            }   

        };
        
        fetchCompReviews();
    
    }, [compId]);


    console.log("compDetail: ",compDetail);
    console.log("compReview: ",compReview);


    return(
        <div className={styles.container}>
            
            {/* 공모전 상세 정보 */}
            <div className = {styles.compDetailContainer}>
                
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
                    {compReview.map((review, index) => (
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
