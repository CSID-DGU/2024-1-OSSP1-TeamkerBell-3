import ComplimentManTag from "../../stores/tags/ComplimentManTag";
import FireManTag from "../../stores/tags/FireManTag";
import GoodListenerManTag from "../../stores/tags/GoodListenerManTag";
import PlannerManTag from "../../stores/tags/PlannerManTag";
import styles from "./ApplyResume.module.css";
import SingleAndDoubleClick from "./SingleAndDoubleClick";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const tagComponents = {
  0: ComplimentManTag,
  1: FireManTag,
  2: GoodListenerManTag,
  3: PlannerManTag,
  // 이런 식으로 필요한 만큼 추가할 수 있습니다.
};

const ApplyResume = ({ key, user, resume, isSelected, onSelect }) => {
  const navigate = useNavigate();

  // 한번 클릭 시, 이력서 선택
  const handleClick = () => {
    onSelect(resume.id);
    console.log("선택된 이력서 번호: " + resume.id);
  };

  // 두번 클릭 시, 이력서 수정
  const handleDoubleClick = () => {
    console.log("이력서 수정");
    navigate(`/user/${user}/mypage/resumes/${resume.id}`);
  };

  const resumeItem = isSelected ? styles.selectedResume : styles.resumeItem; //이력서 선택 시 스타일 변경

  const click = SingleAndDoubleClick(handleClick, handleDoubleClick); //클릭 횟수 처리

  return (
    <div className={resumeItem} onClick={click}>
      <div className={styles.profileImgNName}>
        <img src={resume.img} alt="유저 이미지" />
        <div className={styles.nameNTemp}>
          <h1>{resume.name}</h1>
          <p>온도 : {resume.score}</p>
        </div>
      </div>
      <p className={styles.resumeContent}>{resume.userIntro}</p>
      <h3 className={styles.greenColor}>Details:</h3>
      <ul>
        <li>
          <span className={styles.label}>이름:</span> <span>{resume.name}</span>
        </li>
        <li>
          <span className={styles.label}>전화번호:</span>{" "}
          <span>{resume.phone}</span>
        </li>
        <li>
          <span className={styles.label}>기술:</span>{" "}
          <span>{resume.skill}</span>
        </li>
        <li>
          <span className={styles.label}>Github:</span>{" "}
          <span>{resume.githubLink}</span>
        </li>
      </ul>
      <div className={styles.tagContainer}>
        {resume.tags &&
          resume.tags.length > 0 &&
          resume.tags.map((tag, index) => {
            const TagComponent = tagComponents[tag];
            return <TagComponent key={index} />;
          })}
      </div>
      <div className={styles.baekjoonCard}>
        <span className={styles.label}>백준 티어:</span> <br />
        <img
          clssName={styles.baekjoonCardImg}
          src={`https://mazassumnida.wtf/api/v2/generate_badge?boj=${resume.tier}`}
          alt="백준 티어 이미지"
        ></img>
      </div>
    </div>
  );
};

export default ApplyResume;
