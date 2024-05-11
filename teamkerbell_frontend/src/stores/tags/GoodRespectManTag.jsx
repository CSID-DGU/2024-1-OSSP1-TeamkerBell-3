import styles from "./tags.module.css";
const GoodRespectManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 의견을 잘 존중해요 🤗</p>
    </div>
  );
};

export default GoodRespectManTag;
