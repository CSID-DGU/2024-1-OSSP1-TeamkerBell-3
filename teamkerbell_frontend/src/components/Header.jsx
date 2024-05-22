import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
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
          <p className={styles.welcomeMessage}>홍규진님 반갑습니다! </p>
          <Link to="/login" className={styles.logoutLink}>
            <button className={styles.logoutButton}>로그아웃</button>
          </Link>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <p></p>
        <p></p>
        <Link to="/">
          <button className={styles.headerButton}>공모전</button>
        </Link>

        <button className={styles.headerButton}>팀찾기</button>
        <Link to="/user/1/mypage/editProfile">
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
