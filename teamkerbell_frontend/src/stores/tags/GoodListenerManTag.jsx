import styles from "./tags.module.css";
const GoodListenerManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 말을 잘 들어줘요 🔊</p>
    </div>
  );
};

export default GoodListenerManTag;
