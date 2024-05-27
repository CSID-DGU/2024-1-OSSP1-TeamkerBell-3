import React, { useEffect } from "react";
import styles from "./MypageLeftSide.module.css";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ProfileEdit } from "../../stores/mypage_icon/profile_edit.svg";
import { ReactComponent as FavoriteComp } from "../../stores/mypage_icon/favorite.svg";
import { ReactComponent as Portfolios } from "../../stores/mypage_icon/portfolio.svg";
import { ReactComponent as ProjectManage } from "../../stores/mypage_icon/project_manage.svg";
import { ReactComponent as MyReview } from "../../stores/mypage_icon/my_review.svg";
import { categoryState } from "../../atoms";

const LeftSide = () => {
  const categoryComponents = [
    ProfileEdit,
    FavoriteComp,
    Portfolios,
    ProjectManage,
    MyReview,
  ];

  const [categoryNum, setCategoryNum] = useRecoilState(categoryState);
  
  const localUserId = localStorage.getItem("userId");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUserId) {
      navigate("/login"); // userId가 없으면 로그인 페이지로 리다이렉트
    } else if (userId !== localUserId) {
      navigate("/login"); // userId 불일치 시 로그인 페이지로 리다이렉트
    }
  }, [userId, localUserId, navigate]);

  const handleSideButton = (index) => {
    setCategoryNum(index);
    console.log("[Recoil]categoryNum :", categoryNum);
    switch (index) {
      case 0:
        navigate(`/user/${userId}/mypage/editProfile`); // userId를 동적으로 사용하여 이동
        break;
      case 1:
        navigate(`/user/${userId}/mypage/compLiked`);
        break;
      case 2:
        navigate(`/user/${userId}/mypage/resumes`);
        break;
      case 3:
        navigate(`/user/${userId}/mypage/projects`);
        break;
      case 4:
        navigate(`/user/${userId}/mypage/myAchieve`);
        break;
      case 5:
        navigate(`/user/${userId}/mypage/compLiked`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.LeftSide}>
      <div>
        <p className={styles.mypage}> Mypage </p>

        {categoryComponents.map((Category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <Category
              key={index}
              fill={categoryNum === index ? "#black" : "#ccc"}
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
