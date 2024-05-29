import styles from "./tags.module.css";
const FastManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 일 처리가 빨라요 👣</p>
    </div>
  );
};

export default FastManTag;
