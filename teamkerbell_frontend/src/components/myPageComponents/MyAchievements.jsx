import ProgressBar from "./ProgressBar";
import styles from "./MyAchievements.module.css";
import ComplimentManTag from "../../stores/tags/ComplimentManTag";
import FireManTag from "../../stores/tags/FireManTag";
import GoodListenerManTag from "../../stores/tags/GoodListenerManTag";
import PlannerManTag from "../../stores/tags/PlannerManTag";
import FastResponseTag from "../../stores/tags/FastResponseTag";
import FeedbackerTag from "../../stores/tags/FeedbackerTag";
import LeaderShipKingTag from "../../stores/tags/LeaderShipKingTag";
import RespectGuyTag from "../../stores/tags/RespectGuyTag";
import MoodMakerTag from "../../stores/tags/MoodMakerTag";
import FastWorkerTag from "../../stores/tags/FastWorkerTag";

const MyAchievements = ({ data }) => {
  const DUMMY_TAGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const tagComponents = {
    0: ComplimentManTag,
    1: FireManTag,
    2: GoodListenerManTag,
    3: PlannerManTag,
    4: FastResponseTag,
    5: FeedbackerTag,
    6: LeaderShipKingTag,
    7: RespectGuyTag,
    8: MoodMakerTag,
    9: FastWorkerTag,
    // 이런 식으로 필요한 만큼 추가할 수 있습니다.
  };

  return (
    <div className={styles.container}>
      <div className={styles.temperatureContainer}>
        <h2> 나의 성취 </h2>
        <h3> 나의 온도 🔥</h3>
        <ProgressBar temperature={data.temp} />
      </div>
      <div className={styles.myComplimentContainer}>
        <h3> 내가 받은 칭찬 코멘트</h3>
        {DUMMY_TAGS.length > 0 &&
          DUMMY_TAGS.map((tag, index) => {
            const TagComponent = tagComponents[tag];
            return <TagComponent key={index} />;
          })}
      </div>
      <div className={styles.myComplimentContainer}>
        <h3>나의 개선점</h3>
        {data.improvementPoint.map((improvement, index) => (
          <div key={index} className={styles.comment}>
            <p>{improvement}</p>
          </div>
        ))}
      </div>
      <div className={styles.myComplimentContainer}>
        <h3>나의 비매너</h3>
        {data.rudeness.map((badManner, index) => (
          <div key={index} className={styles.comment}>
            <p style={{ color: "red" }}>⚠️ {badManner} ⚠️</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAchievements;
