import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import FavoriteComp from "../components/myPageComponents/FavoriteComp";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import { getCompLiked } from "../api/user";
import { useParams } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent"; // Ensure correct import path

const CompLikedPage = () => {
  const setCategoryState = useSetRecoilState(categoryState);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [comps, setComps] = useState([]);

  const DUMMY_COMP = [
    {
      id: 0,
      image: "/comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
      deadline: new Date("2024-05-10"),
    },
    {
      id: 1,
      image: "/comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
      deadline: new Date("2024-06-15"),
    },
    {
      id: 2,
      image: "/comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
      deadline: new Date("2024-07-20"),
    },
    {
      id: 3,
      image: "/comp_example.jpeg",
      title: "생성형 AI 이미지 활용 공모전",
      description:
        "공모전에 대한 설명: 생성형 AI로부터 만들 수 있는 이미지의 활용 방안에 대해 탐구한다.",
      jobs: ["프론트엔드", "백엔드", "기획", "디자인"],
      deadline: new Date("2024-07-20"),
    },
  ];

  useEffect(() => {
    setCategoryState(1);

    const fetchCompLiked = async () => {
      try {
        const response = await getCompLiked(userId);
        setComps(response.data || []); // Ensure comps is always an array
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsError(true);
          setErrorMessage("찜한 공모전이 없어요!");
        } else {
          setIsError(true);
          setErrorMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    };

    fetchCompLiked();
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
          <ErrorComponent message={errorMessage} />
        ) : (
          <FavoriteComp comps={comps.length > 0 ? comps : DUMMY_COMP} />
        )}
      </div>
    </div>
  );
};

export default CompLikedPage;
