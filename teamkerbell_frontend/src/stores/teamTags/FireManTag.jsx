import styles from "./tags.module.css";
const FireManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 열정맨이에요 🔥</p>
    </div>
  );
};

export default FireManTag;
