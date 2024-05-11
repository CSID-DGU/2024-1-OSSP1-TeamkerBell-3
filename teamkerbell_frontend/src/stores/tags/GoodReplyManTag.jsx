import styles from "./tags.module.css";
const GoodReplyManTag = ({ isBorderBlack }) => {
  return (
    <div
      style={{
        borderColor: isBorderBlack ? "#7a7a7a" : "#006322",
        color: isBorderBlack ? "#7a7a7a" : "#006322",
      }}
      className={styles.tags}
    >
      <p># 답장을 잘 해줘요 💬</p>
    </div>
  );
};

export default GoodReplyManTag;
