import styles from "./tags.module.css";
const GoodFeedbackManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 피드백을 잘해줘요 👀</p>
    </div>
  );
};

export default GoodFeedbackManTag;
