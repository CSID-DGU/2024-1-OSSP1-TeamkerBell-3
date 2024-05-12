import styles from "./tags.module.css";
const FireManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 열정맨이에요 🔥</p>
    </div>
  );
};

export default FireManTag;
