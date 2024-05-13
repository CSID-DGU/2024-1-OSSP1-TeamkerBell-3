import React from "react";
import styles from "./main.module.css";
import Carousel from "../components/mainComponents/Carousel";
import CompCard from "../components/mainComponents/CompCard"; // CompCard 컴포넌트 import
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const DUMMY_CAROUSEL_IMAGES = [
    "../../comp_example.jpeg",
    "../../comp_example.jpeg",
    "../../comp_example.jpeg",
  ];

  // 공모전 목록 데이터
  const DUMMY_COMP = [
    {
      id: 0,
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      id: 1,
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      id: 2,
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      id: 3,
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    // 필요한 만큼 데이터를 추가할 수 있음
  ];

  // 공모전 카테고리 목록
  const compMakingButtonHandler = () => {
    navigate("/compregister");
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselContainer}>
        <Carousel images={DUMMY_CAROUSEL_IMAGES} />
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
        {DUMMY_COMP.map((competition, index) => (
          <Link to={`/comp/${competition.id}`} className={styles.comp}>
            <CompCard
              key={index}
              image={competition.image}
              title={competition.title}
              description={competition.description}
              jobs={competition.jobs}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
