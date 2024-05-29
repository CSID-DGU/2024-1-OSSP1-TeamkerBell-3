import styles from "./tags.module.css";
const RespectGuyTag = () => {
  return (
    <div
      className={`${styles.tags} ${
        isBorderBlack ? styles.tags : styles.borderGreen
      }`}
    >
      <p># 의견을 잘 존중해요 🤗 </p>
    </div>
  );
};

export default RespectGuyTag;
