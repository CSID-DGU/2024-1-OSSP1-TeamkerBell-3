// src/team.js
import React, { useEffect } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import FavoriteComp from "../components/myPageComponents/FavoriteComp";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

const CompLikedPage = () => {
  const setCategoryState = useSetRecoilState(categoryState); // Recoil 상태를 업데이트하는 함수 가져오기

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
    // 필요한 만큼 데이터를 추가할 수 있음
  ];

  useEffect(() => {
    setCategoryState(1); // categoryState를 1로 설정
  }, [setCategoryState]); // 의존성 배열에 setCategoryState를 추가

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {/* {categoryStateValue === 0 && <EditProfile />} */}
        <FavoriteComp comps={DUMMY_COMP} />
      </div>
    </div>
  );
};

export default CompLikedPage;
