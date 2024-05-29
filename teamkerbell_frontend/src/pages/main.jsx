import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import Carousel from "../components/mainComponents/Carousel";
import CompCard from "../components/mainComponents/CompCard";
import { useNavigate } from "react-router-dom";
import { getComps } from "../api/comp";

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

  useEffect(() => {
    const fetchComps = async () => {
      try {
        const response = await getComps();
        // 데이터가 null인지 확인하고 빈 배열로 설정
        setCompetitions(response.data || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComps();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
