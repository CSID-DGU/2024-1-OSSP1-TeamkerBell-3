import styles from "./tags.module.css";
const ComplimentManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 칭찬을 잘해줘요 🥕</p>
    </div>
  );
};

export default ComplimentManTag;
