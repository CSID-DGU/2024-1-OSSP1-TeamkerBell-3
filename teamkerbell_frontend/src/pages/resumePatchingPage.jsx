import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import { useRecoilState } from "recoil";
import { categoryState } from "../atoms";
import PatchingPortfolio from "../components/myPageComponents/PatchingPortfolio";
import { getUserDetailResume, patchUserDetailResume } from "../api/user";
import { useParams } from "react-router-dom";

const ResumePatchingPage = () => {
  const localStorageUserId = localStorage.getItem("userId");
  const { resumeId } = useParams();
  const [categoryNum, setCategoryNum] = useRecoilState(categoryState);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  setCategoryNum(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDetailResume(
          localStorageUserId,
          resumeId
        );
        setResumeData(response.data);
        // 가져온 resumeData를 PatchingPortfolio에 전달
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [localStorageUserId, resumeId]); // useEffect의 의존성 배열 추가

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div> {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {resumeData && <PatchingPortfolio resumeData={resumeData} />}
      </div>
    </div>
  );
};

export default ResumePatchingPage;
