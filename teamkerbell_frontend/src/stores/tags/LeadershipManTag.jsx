import styles from "./tags.module.css";
const LeadershipManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 리더십이 장난아니에요 🚩</p>
    </div>
  );
};

export default LeadershipManTag;
