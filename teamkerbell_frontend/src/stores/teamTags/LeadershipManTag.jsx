import styles from "./tags.module.css";
const LeadershipManTag = ({ isBorderBlack }) => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 리더십이 장난아니에요 🚩</p>
    </div>
  );
};

export default LeadershipManTag;
