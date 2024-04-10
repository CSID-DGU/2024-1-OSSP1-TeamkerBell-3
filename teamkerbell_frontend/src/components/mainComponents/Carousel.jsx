import React, { useState } from "react";
import styles from "./Carousel.module.css";

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

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slideContainer}
        style={{ "--currentIndex": currentIndex }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
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
