import styles from "./tags.module.css";
const MoodMakerManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 분위기 메이커에요 🌟</p>
    </div>
  );
};

export default MoodMakerManTag;
