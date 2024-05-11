import styles from "./tags.module.css";
const GoodFeedbackManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 피드백을 잘해줘요 👀</p>
    </div>
  );
};

export default GoodFeedbackManTag;
