import styles from "./MypageLeftSide.module.css";
import React, { useState } from "react";
import { useRecoilState } from "recoil"; // Recoil Hook 추가

import { ReactComponent as ProfileEdit } from "../../stores/mypage_icon/profile_edit.svg";
import { ReactComponent as FavoriteComp } from "../../stores/mypage_icon/favorite.svg";
import { ReactComponent as Portfolios } from "../../stores/mypage_icon/portfolio.svg";
import { ReactComponent as ProjectManage } from "../../stores/mypage_icon/project_manage.svg";
import { ReactComponent as MyReview } from "../../stores/mypage_icon/my_review.svg";
import { categoryState } from "../../atoms"; // Recoil에서 정의한 atom 불러오기

const LeftSide = ({}) => {
  const categoryComponents = [
    ProfileEdit,
    FavoriteComp,
    Portfolios,
    ProjectManage,
    MyReview,
  ];
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState); // Recoil 상태와 setter 함수 불러오기

  const handleSideButton = (index) => {
    setCategoryNum(index); // Recoil을 통해 categoryNum 상태 업데이트
    console.log("[Recoil]categoryNum :", categoryNum);
  };

  return (
    <div className={styles.LeftSide}>
      <div>
        <p className={styles.mypage}> Mypage </p>

        {categoryComponents.map((Category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <Category
              key={index}
              fill={categoryNum === index ? "#black" : "#ccc"} // 색상 설정
              className={
                categoryNum === index ? styles.categoryClicked : styles.category
              }
              onClick={() => handleSideButton(index)}
            ></Category>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
