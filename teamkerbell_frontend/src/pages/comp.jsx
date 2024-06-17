import React, { useEffect, useState } from "react";
import styles from "./comp.module.css";
import CompDetail from "../components/matchingComponents/CompDetail"; // CompDetail 컴포넌트 import
import ReviewCard from "../components/matchingComponents/ReviewCard"; // ReviwCard 컴포넌트 import
import AskMatching from "../components/matchingComponents/AskMatchingComponent"; //AskMatching 컴포넌트 import
import { Link, useParams } from "react-router-dom";
import { getCompDetail } from "../api/comp";
import ErrorComponent from "../components/ErrorComponent";
import TopButton from "../components/matchingComponents/TopButton";

const CompMatching = () => {
  //공모전 상세 내용
  const { compId } = useParams();
  const [compDetail, setCompDetail] = useState(null);
  const [compReview, setCompReview] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("compDetail: ",compDetail);
  console.log("compReview: ",compReview);

  const DUMMY_COMP_REVIEWS = [
    "생각보다 준비해야 할 자료들이 너무 많아요ㅠㅠㅠ",
    "조금만 꼼꼼하게 준비했으면 상 탈 수 있을 거 같은데 아쉽네요",
    "개인적으로 너무 만족스러웠던 대회였습니다!!!",
    "현직자들과 함께 경쟁해야 해서 힘들어요",
    "대회가 알차고 구성이 잘 되어 있어요~~"
  ]


  useEffect(() => {
    const fetchCompDetail = async () => {
      try {
        const response = await getCompDetail(compId);
        setCompDetail(response.data.compInfo);
        //setCompReview(response.data.reviewList);

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



  

  return (
  
    <div className={styles.container}>    
      <TopButton></TopButton>

      {/* 공모전 상세 정보 */}
      <div className={styles.compDetailContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <ErrorComponent message={errorMessage} />
        ) : (
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
        )}
      </div>

      {/* 공모전 후기 */}
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <h2 className={styles.reviewTitle}>공모전 후기</h2>
          <Link to={`/comp/${compId}/reviewList`} className={styles.moreReviews}>
            더보기
          </Link>
        </div>

        <div className={styles.reviews}>
          {DUMMY_COMP_REVIEWS.slice(0,3).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>

      {/* 공모전 매칭 선택 질문 */}
      <div>
        <AskMatching></AskMatching>
      </div>
          
      
    </div>
  );
};

export default CompMatching;
