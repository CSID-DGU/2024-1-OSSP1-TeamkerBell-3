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
  const tagCounts = data.complimentTag.reduce((acc, cur) => {
    const tag = Object.keys(cur)[0]; // 현재 객체의 key (태그) 추출
    const count = cur[tag]; // 현재 객체의 value (개수) 추출

    acc[tag] = (acc[tag] || 0) + count;
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.temperatureContainer}>
        <h2> 나의 성취 </h2>
        <h3> 나의 온도 🔥</h3>
        <ProgressBar temperature={data.temp} />
      </div>
      <div className={styles.myComplimentContainer}>
        <h3> 내가 받은 칭찬 코멘트</h3>
        {data.complimentTag.map((tagObj, index) => {
          const tagNumber = Object.keys(tagObj)[0]; // '#2' 형태의 문자열 추출
          const tag = parseInt(tagNumber.substring(1)); // '#2'에서 숫자 2 추출
          const count = tagObj[tagNumber]; // 칭찬 개수 추출
          const TagComponent = tagComponents[tag];

          return (
            <div key={index} className={styles.tagItem}>
              {TagComponent && <TagComponent />}
              <span className={styles.tagCount}>({count})</span>
            </div>
          );
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
