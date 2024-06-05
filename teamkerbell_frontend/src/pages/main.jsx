import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import Carousel from "../components/mainComponents/Carousel";
import CompCard from "../components/mainComponents/CompCard";
import { useNavigate } from "react-router-dom";
import { getComps } from "../api/comp";
import { deleteCompLiked, getCompLiked, setCompLiked } from "../api/user";

const MainPage = () => {
  const navigate = useNavigate();
  const CAROUSEL_IMAGES = [
    "../../compImage1.png",
    "../../compImage2.png",
    "../../compImage3.png",
  ];

  // 공모전 목록 데이터 상태 관리
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const [likedCompIds, setLikedCompIds] = useState([]);

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const response = await getComps();
        setCompetitions(response.data || []);

        // 사용자의 좋아요 목록 가져오기
        const compLikeResponse = await getCompLiked(userId);
        if (compLikeResponse.status === 200) {
          setLikedCompIds(compLikeResponse.data.map((comp) => comp.id));
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComps();
  }, [userId]); // userId 변경 시 다시 실행

  const handleCompLike = async (compId) => {
    try {
      if (likedCompIds.includes(compId)) {
        // 이미 좋아요한 경우: 좋아요 취소
        const response = await deleteCompLiked(userId, compId);
        if (response.status == 204) {
          alert("찜하기가 취소되었습니다.");
        }
        setLikedCompIds(likedCompIds.filter((id) => id !== compId));
      } else {
        // 좋아요하지 않은 경우: 좋아요 추가
        const response = setCompLiked(userId, compId);
        if (response.status == 200) {
          alert("공모전 찜하기가 되었습니다!");
        }
        setLikedCompIds([...likedCompIds, compId]);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      // 에러 처리 로직 추가 (필요에 따라)
    }
  };

  const compMakingButtonHandler = () => {
    navigate("/compregister");
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return (
      <div className={styles.error}>
        Error: {error.message}{" "}
        <button
          className={styles.compMakingButton}
          onClick={compMakingButtonHandler}
        >
          공모전 등록하기
        </button>
      </div>
    );
  }

  // 공모전 데이터가 없을 때 메시지 표시
  if (competitions.length === 0) {
    return (
      <div className={styles.noComps}>
        <h1>등록된 공모전이 없습니다.</h1>{" "}
        <button
          className={styles.compMakingButton}
          onClick={compMakingButtonHandler}
        >
          공모전 등록하기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.carouselContainer}>
        <Carousel images={CAROUSEL_IMAGES} />
      </div>

      <h2>IT 공모전 목록</h2>
      <div className={styles.compMakingContainer}>
        <button
          className={styles.compMakingButton}
          onClick={compMakingButtonHandler}
        >
          공모전 등록하기
        </button>
      </div>
      <br />
      <br />
      <div className={styles.competitionsContainer}>
        {competitions.map((competition, index) => (
          <CompCard
            id={competition.id}
            key={index}
            image={competition.img}
            title={competition.name}
            description={competition.theme}
            jobs={["프론트엔드", "백엔드", "기획", "디자인"]}
            isHeartActive={likedCompIds.includes(competition.id)} // 좋아요 상태 전달
            handleHeartClick={() => handleCompLike(competition.id)} // 좋아요 클릭 핸들러
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
