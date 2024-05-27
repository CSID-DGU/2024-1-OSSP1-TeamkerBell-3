import styles from "./tags.module.css";
const GoodListenerManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 말을 잘 들어줘요 🔊</p>
    </div>
  );
};

export default GoodListenerManTag;
