import styles from "./tags.module.css";
const MoodMakerManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 분위기 메이커에요 🌟</p>
    </div>
  );
};

export default MoodMakerManTag;
