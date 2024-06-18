import React, { useState } from "react";
import styles from "./Carousel.module.css";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const getCompLink = (index) => {
    switch (index) {
      case 0:
        return `/comp/1`; // index 0 -> /comp/1
      case 1:
        return `/comp/2`; // index 1 -> /comp/2
      case 2:
        return `/comp/4`; // index 2 -> /comp/4
      // 필요한 경우 다른 index에 대한 링크 추가
      default:
        return `/comp/${index + 1}`; // 기본값
    }
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slideContainer}
        style={{
          "--currentIndex": currentIndex,
          width: `calc(100% * ${images.length})`, // 이미지 개수에 따른 너비 설정
        }}
      >
        {images.map((image, index) => (
          <div // 외부 div 추가
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <Link key={index + 1} to={getCompLink(index)}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ width: "33%", height: "100%" }} // 이미지 크기 설정
              />
            </Link>
          </div>
        ))}
      </div>

      <button className={styles.prevButton} onClick={goToPrevSlide}>
        {"<"}
      </button>
      <button className={styles.nextButton} onClick={goToNextSlide}>
        {">"}
      </button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
