import React, { useEffect, useState } from "react";
import styles from "./evaluation.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import LastBefore from "../components/teamComponents/LastBefore";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

import Fast from "../stores/teamTags/FastManTag";
import Reply from "../stores/teamTags/GoodReplyManTag";
import Respect from "../stores/teamTags/GoodRespectManTag";
import Mood from "../stores/teamTags/MoodMakerTag";
import Listen from "../stores/teamTags/GoodListenerManTag";
import Feedback from "../stores/teamTags/FeedbackManTag";
import Lead from "../stores/teamTags/LeadershipManTag";
import Compliment from "../stores/teamTags/ComplimentManTag";
import Plan from "../stores/teamTags/PlannerManTag";
import Passion from "../stores/teamTags/FireManTag";

import { getEvaluate, sendEvaluate } from "../api/team";
import { useParams } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";

const Tags = [
  Fast,
  Reply,
  Respect,
  Mood,
  Listen,
  Feedback,
  Lead,
  Compliment,
  Plan,
  Passion,
];

/* 메인 */
const Evaluation = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기
  const { tid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [memberInfo, setMemberInfo] = useState();
  const [isEnd, setIsEnd] = useState();

  useEffect(() => {
    const fetchReportInfo = async () => {
      setCategoryState(1);
      setIsLoading(true);

      try {
        const responseGet = await getEvaluate(tid);
        setIsEnd(responseGet.data.isEnd);
        setMemberInfo(responseGet.data.memberList);
      } catch (error) {
        setIsError(true);
        setErrorMessage("상호평가 기본정보를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching team evaluate detail: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportInfo();
  }, [tid, setCategoryState]);

  const [improve, setImprove] = useState();

  const [improves, setImproves] = useState([]);

  useEffect(() => {
    console.log(improves);
    if (memberInfo) {
      setImproves(
        memberInfo.map((member) => ({
          id: member.id,
          improvement: improve,
          reporter: 3,
        }))
      );
    }
  }, [memberInfo]);

  const feedbackChange = (event) => {
    const updatedImproves = improves.map((i) => {
      // id와 score.id를 문자열로 변환하여 비교
      if (i.id.toString() === id.toString()) {
        // 참여도 업데이트
        return { ...i, improvement: event.target.value };
      }

      // 일치하지 않는 경우 원래 객체 반환
      return i;
    });

    setImproves(updatedImproves); // 업데이트된 scores 배열로 상태 업데이트
    console.log("improvement:", event.target.value);
  };

  const [review, setReview] = useState();
  const [reviews, setReviews] = useState([]); // myreview 변수 초기화 필요

  /* 후기 변경시 작동 */
  const reviewChange = (event) => {
    const newReview = event.target.value;
    setReview(newReview);
    setReviews({ review: newReview }); // 배열에 단일 리뷰만 유지
    console.log(newReview);
  };
  /* 버튼 클릭시 모든 정보 전송 */
  const send = () => {
    try {
      const responseSend = sendEvaluate(tid, scores, improves, reviews);
      console.log("[Post]:", responseSend);
      console.log("score_tags: ", scores);
      console.log("improvements: ", improves);
      console.log("review:", reviews);
    } catch (error) {
      console.error("Error sending team report:", error);
    }
  };

  const [id, setId] = useState();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (memberInfo) {
      setScores(
        memberInfo.map((member) => ({
          id: member.id,
          participation: 0,
          contribution: 0,
          attitude: 0,
          tag: [],
        }))
      );
    }
  }, [memberInfo]);

  const nameClicked = (event) => {
    console.log(event.target.value);
    setId(event.target.value);
  };

  useEffect(() => {
    console.log(scores);
  }, [scores]);
  /* 평가 값이 변할 때마다 콘솔 출력 */

  const title = ["참여도", "기여도", "인성/태도"];

  const scoreClicked = (event) => {
    const updatedScores = scores.map((score) => {
      // id와 score.id를 문자열로 변환하여 비교
      if (score.id.toString() === id.toString()) {
        // 참여도 업데이트
        if (event.target.name === "참여도") {
          return { ...score, participation: event.target.value };
        }
        // 성실성 업데이트
        else if (event.target.name === "기여도") {
          return { ...score, contribution: event.target.value };
        }
        // 팀워크 업데이트
        else if (event.target.name === "인성/태도") {
          return { ...score, attitude: event.target.value };
        }
      }
      // 일치하지 않는 경우 원래 객체 반환
      return score;
    });

    setScores(updatedScores); // 업데이트된 scores 배열로 상태 업데이트
  };

  const [isBorderBlackArray, setIsBorderBlackArray] = useState(
    Array(Tags.length).fill(true)
  );

  const tagColorHandle = (idx) => {
    // 클릭한 버튼의 상태를 변경
    setIsBorderBlackArray((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });

    console.log("idx", idx);
    const updatedScores = scores.map((score) => {
      // id와 score.id를 문자열로 변환하여 비교
      if (score.id.toString() === id.toString()) {
        // tags 속성이 이미 존재한다면 해당 배열에 idx 추가, 그렇지 않다면 새 배열 생성
        const updatedTag = score.tag ? [...score.tag, idx] : [idx];
        updatedTag.sort((a, b) => a - b); /* tag 정렬 */
        return { ...score, tag: updatedTag };
      }
      // 일치하지 않는 경우 원래 객체 반환
      return score;
    });

    setScores(updatedScores); // 업데이트된 scores 배열로 상태 업데이트
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <ErrorComponent message={errorMessage} />
      ) : (
        <div className={styles.main}>
          {isEnd ? (
            <div>
              <h2 className={styles.title}>마무리</h2>
              <hr className={styles.line} />
              <div className={styles.box}>
                <h3 className={styles.title2}>평가</h3>
                <hr className={styles.line2} />

                {/* 이름 버튼 */}
                <div className={styles.name}>
                  {memberInfo.map((name) => (
                    <label key={name.id} className={styles.nameRadio}>
                      <input
                        type="radio"
                        name="memberInfo"
                        value={name.id}
                        onChange={nameClicked}
                      />
                      <span>{name.nickname}</span>
                    </label>
                  ))}
                </div>

                {/* 상호평가 */}
                {title.map((title, eindex) => (
                  <div key={eindex} className={styles.box2}>
                    <div className={styles.evaTitle}>{title}</div>
                    {[1, 2, 3, 4, 5].map((value, index) => (
                      <div key={index}>
                        {value < 6 ? (
                          <div className={styles.num}>{value}</div>
                        ) : null}
                        <label key={index} className={styles.radioStyle}>
                          <input
                            type="radio"
                            name={title}
                            value={value}
                            onClick={scoreClicked}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <p></p>

                {/* 태그 선택 */}
                <h3 className={styles.title2}>칭찬 코멘트</h3>
                <hr className={styles.line2} />

                <div className={styles.tags}>
                  {[
                    Tags.slice(0, 2), // 0, 1
                    Tags.slice(2, 5), // 2, 3, 4
                    Tags.slice(5, 7), // 5, 6
                    Tags.slice(7), // 7, 8, 9
                  ].map((group, groupIndex) => (
                    <div key={groupIndex} className={styles.tagArray}>
                      {group.map((Tag, tagIndex) => {
                        // 전체 Tags 배열에서 현재 태그의 인덱스를 찾음
                        const fullIndex = Tags.indexOf(Tag);
                        return (
                          <button
                            key={fullIndex} // 각 태그의 실제 인덱스를 키로 사용
                            onClick={() => {
                              tagColorHandle(fullIndex); // 올바른 인덱스로 핸들러 호출
                            }}
                            className={styles.tag}
                          >
                            <Tag
                              isBorderBlack={isBorderBlackArray[fullIndex]} // 올바른 인덱스로 상태 확인
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  <h3 className={styles.title2}>개선점</h3>
                  <hr className={styles.line2} />
                  <p>
                    ※ 단순 비방, 욕설 등을 기재할 시, 서비스 이용이 제한될 수
                    있습니다.
                  </p>

                  <textarea
                    className={styles.boxInput}
                    placeholder="해당 팀원이 개선해야 할 점을 작성해 주세요."
                    onChange={feedbackChange}
                  ></textarea>
                </div>
              </div>{" "}
              <div>
                <h2 className={styles.title}>공모전 후기</h2>
                <hr className={styles.line} />

                <textarea
                  className={styles.boxInput}
                  placeholder="공모전을 진행한 후기를 작성해주세요."
                  onChange={reviewChange}
                ></textarea>

                <button className={styles.submitsBtn} onClick={send}>
                  제출
                </button>
              </div>
            </div>
          ) : (
            <LastBefore />
          )}
        </div>
      )}
    </div>
  );
};

export default Evaluation;
