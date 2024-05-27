import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/user";

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchUsername = async () => {
        try {
          const response = await getUserProfile(userId);
          if (response.status === 200) {
            setUsername(response.data.nickname);
          } else {
            console.error("사용자 정보를 가져오는데 실패했습니다.");
          }
        } catch (error) {
          console.error("오류 발생:", error);
        }
      };

      fetchUsername();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUsername("");
    navigate("/login");
  };

  return (
    <header>
      <div className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={"../../../headerLogo.png"}
            alt="headerLogo"
            className={styles.headerLogo}
          />
        </Link>

        <div className={styles.welcomeNLogout}>
          {username ? (
            <>
              <p className={styles.welcomeMessage}>{username}님 반갑습니다! </p>
              <button className={styles.logoutButton} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              <button className={styles.loginButton}>로그인</button>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <p></p>
        <p></p>
        <Link to="/">
          <button className={styles.headerButton}>공모전</button>
        </Link>
        <Link to="/team/teamList">
          <button className={styles.headerButton}>팀찾기</button>
        </Link>
        <Link to={`/user/${userId}/mypage/editProfile`}>
          <button className={styles.headerButton}>마이페이지</button>
        </Link>

        <button className={styles.headerButton}>팀커벨 소개</button>
        <p></p>
        <p></p>
      </div>
    </header>
  );
};

export default Header;
