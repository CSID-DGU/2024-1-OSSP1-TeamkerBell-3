import React from "react";
import styles from "./main.module.css";
import Carousel from "../components/mainComponents/Carousel";
import CompCard from "../components/mainComponents/CompCard"; // CompCard 컴포넌트 import

const MainPage = () => {
  const DUMMY_IMAGES = [
    "../../comp_example.jpeg",
    "../../comp_example.jpeg",
    "../../comp_example.jpeg",
  ];

  // 공모전 목록 데이터
  const DUMMY_COMP = [
    {
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    {
      image: "../../comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
    },
    // 필요한 만큼 데이터를 추가할 수 있음
  ];

  // 공모전 카테고리 목록
  const categories = ["IT 멘토링", "디자인", "아이디어", "마케팅"];

  return (
    <div className={styles.container}>
      <div className={styles.carouselContainer}>
        <Carousel images={DUMMY_IMAGES} />
      </div>

      <h2>공모전 목록</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <button key={index} className={styles.category}>
            {category}
          </button>
        ))}
      </div>

      <div className={styles.competitionsContainer}>
        {DUMMY_COMP.map((competition, index) => (
          <CompCard
            key={index}
            image={competition.image}
            title={competition.title}
            description={competition.description}
            jobs={competition.jobs}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
