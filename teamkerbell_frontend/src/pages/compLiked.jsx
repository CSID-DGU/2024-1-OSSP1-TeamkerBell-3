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
          <FavoriteComp comps={comps} />
        )}
      </div>
    </div>
  );
};

export default CompLikedPage;
