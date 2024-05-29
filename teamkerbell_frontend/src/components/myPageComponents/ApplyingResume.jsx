import { useNavigate, useParams } from "react-router-dom";
import ComplimentManTag from "../../stores/tags/ComplimentManTag";
import FireManTag from "../../stores/tags/FireManTag";
import GoodListenerManTag from "../../stores/tags/GoodListenerManTag";
import PlannerManTag from "../../stores/tags/PlannerManTag";
import styles from "./Resume.module.css";
import Resume from "./Resume";

const tagComponents = {
  0: ComplimentManTag,
  1: FireManTag,
  2: GoodListenerManTag,
  3: PlannerManTag,
  // 이런 식으로 필요한 만큼 추가할 수 있습니다.
};

const ApplyingResume = ({ resume }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { tid } = useParams();
  const userId = localStorage.getItem("userId");
  const handleDoubleClick = () => {
    navigate(`/user/${userId}/mypage/team/${tid}/resume/${resume.id}`); // 이력서 상세 페이지로 이동
    //path="/user/:userId/mypage/team/:tid/resume/:resumeId"
  };
  return <Resume onDoubleClcik={handleDoubleClick} resume={resume} />;
};

export default ApplyingResume;
