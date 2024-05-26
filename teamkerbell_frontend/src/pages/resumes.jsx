// src/team.js
import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import Portfolios from "../components/myPageComponents/Potfolios";

import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태
import { getUserResumes } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent"; // Ensure correct import path

const DUMMY_Portfolio = [
  {
    temperature: 42.5,
    title: "규진's 이력서",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "홍규진",
    age: 24,
    occupation: "프론트엔드 개발/백엔드 개발",
    skills: "JavaScript, React, Django, Flutter",
    baekjoonTier: "Gold",
    github: "github.com/kyujenius",
    tags: [0, 1, 2, 3],
  },
  {
    temperature: 42.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [0, 1, 2],
  },
  {
    temperature: 31.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [0, 3],
  },
  {
    temperature: 39.5,
    title: "Jane's Resume",
    content:
      "안녕하세요, 저는 풀스택 개발자 김동국입니다. 작년에 AI 생성 공모전을 참가하여 경험을 쌓았으며 이를 바탕으로 이번에는 수상을 해보고 싶습니다. 그만큼, 최선을 다하고 열심히 하겠습니다. 감사합니다. 뽑아주세요!",
    name: "Jane Smith",
    age: 28,
    occupation: "Web Developer",
    skills: "HTML, CSS, JavaScript, React",
    baekjoonTier: "Silver",
    github: "github.com/janesmith",
    tags: [],
  },
];

const ResumesPage = () => {
  const setCategoryState = useSetRecoilState(categoryState);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resumes, setResumes] = useState([]);
  const handleResumeButton = () => {
    navigate(`/user/${userId}/mypage/resumeMaking`);
  };
  useEffect(() => {
    setCategoryState(2); // Set the appropriate category state

    const fetchUserResumes = async () => {
      try {
        const response = await getUserResumes(userId);
        setResumes(response.data); // Ensure resumes is always an array
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsError(true);
          setErrorMessage("이력서가 없습니다!");
        } else {
          setIsError(true);
          setErrorMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    };

    fetchUserResumes();
  }, [setCategoryState, userId]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <>
            <ErrorComponent message={errorMessage} />
            <button onClick={handleResumeButton}>이력서 생성</button>
          </>
        ) : (
          <Portfolios
            resumes={resumes.length > 0 ? resumes : DUMMY_Portfolio}
          />
        )}
      </div>
    </div>
  );
};

export default ResumesPage;
