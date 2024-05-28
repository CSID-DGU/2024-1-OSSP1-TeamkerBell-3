import styles from "./tags.module.css";
const ComplimentManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      {" "}
      <p># 칭찬을 잘해줘요 🥕</p>
    </div>
  );
};

export default ComplimentManTag;
