// src/team.js
import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import LeftSide from "../components/myPageComponents/MypageLeftSide";
import ManageProject from "../components/myPageComponents/ManageProject";
import { useRecoilState } from "recoil";
import { categoryState } from "../atoms"; // Recoil에서 정의한 상태

import { getMyProjects } from "../api/user";

const ProjectsPage = () => {
  const [categoryStateValue, setCategoryStateValue] =
    useRecoilState(categoryState);
  const localStorageUserId = localStorage.getItem("userId");
  const [progressingProjects, setProgressingProjects] = useState([]);
  const [recruitingProjects, setRecruitingProjects] = useState([]);
  const [applyingProjects, setApplyingProjects] = useState([]);

  setCategoryStateValue(3);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await getMyProjects(localStorageUserId); // API 호출
        const teams = response.data; // API 응답 데이터에서 팀 정보 추출 (가정)

        // 팀 정보를 기반으로 각 프로젝트 배열에 데이터 추가
        const newProgressingProjects = teams.teamList;
        const newRecruitingProjects = teams.yourTeamList;
        const newApplyingProjects = teams.joinTeamList;

        setProgressingProjects(newProgressingProjects);
        setRecruitingProjects(newRecruitingProjects);
        setApplyingProjects(newApplyingProjects);
      } catch (error) {
        console.error("Error fetching team data:", error);
        // 오류 처리 (예: 사용자에게 알림)
      }
    };

    fetchMyProjects(); // 컴포넌트 마운트 시 팀 데이터 가져오기
  }, [localStorageUserId]); // localStorageUserId 변경 시 다시 가져오기

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      <div className={styles.main}>
        {/* categoryState 값에 따라 다른 컴포넌트 렌더링 */}
        {categoryStateValue === 3 && (
          <ManageProject
            progressingProjcets={progressingProjects}
            recruitingProjects={recruitingProjects}
            applyingProjects={applyingProjects}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
