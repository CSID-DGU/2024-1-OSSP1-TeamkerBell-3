import React, { useEffect, useState } from "react";
import styles from "./AskMatchingComponent.module.css";
import SelectMatchingTeamList from "./SelectMatchingTeamList"; // SelectMatchingTeamList 컴포넌트 import
import RandomMatchingQuestion from "./RandomMatchingQuestion"; // RandomMatchingQuestion 컴포넌트 import
import { getCompDetail, getTeamList } from "../../api/comp";
import { useParams } from "react-router-dom";


const AskMatching = () => {

  const { compId } = useParams();

  const [isRandomMatching, setIsRandomMatching] = useState(false); // 초기값 설정
  const [finderCnt, setFinderCnt ] = useState(-1);
  const [teamlist, setTeamList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("teamlist: ",teamlist);
  console.log("finderCount: ",finderCnt);

  useEffect(()=> {
    const fetchFinderCnt = async () => {
      const response = await getCompDetail(compId);
      setFinderCnt(response.data.finderCount);

    };

    fetchFinderCnt();

  },[compId]);



  //랜덤 매칭
  const handleRandomMatching = () => {
    setIsRandomMatching(false);
  };

  //선택 매칭
  const handleSelectMatching = () => {
    const fetchSelectMatching = async () => {
      try {
        const response = await getTeamList(compId);
        setTeamList(response.data.teamList);

        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsError(true);
          setErrorMessage("선택한 공모전의 팀이 없어요!");
        } else {
          setIsError(true);
          setErrorMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    };

    fetchSelectMatching(); //버튼 클릭 시, 팀 리스트 받아옴
    setIsRandomMatching(true);

  };


  return (
    <div className={styles.askMatchingContainer}>
      <hr className={styles.line}></hr>
      <div className={styles.matchingContent}>
        <p className={styles.matchingQuestion}>
          해당 공모전을 함께할 팀원을 찾으시나요?
        </p>
        <p className={styles.nowMatching}>{finderCnt}명이 팀을 찾고 있어요!</p>
      </div>

      <div className={styles.matchingButtons}>
        <button
          onClick={handleRandomMatching}
          className={
            isRandomMatching
              ? styles.matchingButton
              : styles.matchingButtonActive
          }
        >
          랜덤 매칭
        </button>
        <button
          onClick={handleSelectMatching}
          className={
            isRandomMatching
              ? styles.matchingButtonActive
              : styles.matchingButton
          }
        >
          선택 매칭
        </button>
      </div>
      <div className={styles.matchingMethodDescription}>
        {isRandomMatching ? (
          <div className = {styles.SelectMatchingDescription}>
            <img src="../../../selectMatchingMethod.png"  />
            <SelectMatchingTeamList
              teamlist={teamlist}
            ></SelectMatchingTeamList>
          </div>
          
        ) : (
          <div className = {styles. RandomMatchingDescription}>
            <img src="../../../randomMatchingMethod.png" />
            <RandomMatchingQuestion></RandomMatchingQuestion>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskMatching;
