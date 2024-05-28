import styles from "./tags.module.css";
const PlannerManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 아주 계획적이에요 🗓️</p>
    </div>
  );
};

export default PlannerManTag;
