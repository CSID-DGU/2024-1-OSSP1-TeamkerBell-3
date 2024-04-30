import styles from "./MypageLeftSide.module.css";
import React, { useState } from "react";

import { ReactComponent as ProfileEdit } from "../../stores/mypage_icon/profile_edit.svg";
import { ReactComponent as FavoriteComp } from "../../stores/mypage_icon/favorite.svg";
import { ReactComponent as Portfolios } from "../../stores/mypage_icon/portfolio.svg";
import { ReactComponent as ProjectManage } from "../../stores/mypage_icon/project_manage.svg";
import { ReactComponent as MyReview } from "../../stores/mypage_icon/my_review.svg";

const LeftSide = ({}) => {
  const categoryComponents = [
    ProfileEdit,
    FavoriteComp,
    Portfolios,
    ProjectManage,
    MyReview,
  ];
  const [categoryNum, setCategoryNum] = useState(0);

  const handleSideButton = (index) => {
    setCategoryNum(index);
    console.log(index);
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
