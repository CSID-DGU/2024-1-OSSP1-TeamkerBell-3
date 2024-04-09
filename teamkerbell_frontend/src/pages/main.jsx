import React from "react";
import styles from "./main.module.css";
import Carousel from "../components/Carousel";
import CompCard from "../components/CompCard"; // CompCard 컴포넌트 import

const MainPage = () => {
  const DUMMY_IMAGES = [
    "../../../logo192.png",
    "../../../logo512.png",
    "../../../logo192.png",
  ];

  // 공모전 목록 데이터
  const DUMMY_COMP = [
    {
      image: "image_url_1",
      title: "공모전 제목 1",
      description: "공모전 설명 1",
      job: "직군 정보 1",
    },
    {
      image: "image_url_2",
      title: "공모전 제목 2",
      description: "공모전 설명 2",
      job: "직군 정보 2",
    },
    {
      image: "image_url_3",
      title: "공모전 제목 3",
      description: "공모전 설명 3",
      job: "직군 정보 3",
    },
    {
      image: "image_url_4",
      title: "공모전 제목 4",
      description: "공모전 설명 4",
      job: "직군 정보 4",
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
            job={competition.job}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
