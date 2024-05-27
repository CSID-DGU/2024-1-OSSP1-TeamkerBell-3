// src/Login.js
import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/user";

const MainPage = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook 추가

  const handleLoginButton = async (e) => {
    // async 함수로 변경
    e.preventDefault();
    if (!registerId || !registerPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await login(registerId, registerPassword); // await 추가
      if (response.status === 200) {
        // 로그인 성공 확인
        localStorage.setItem("userId", response.data.userId); // userId 저장
        navigate("/"); // 메인 페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요."); // 로그인 실패 처리
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error); // 에러 처리
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TeamkerBell</h2>
      <h3 className={styles.quotes}>
        You still have enough time to make your dream come true.
      </h3>
      <h3 className={styles.subtitle}>로그인</h3>
      <form className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="이메일"
          onChange={(e) => {
            setRegisterId(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="password"
          className={styles.input}
          placeholder="비밀번호"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
          required
        />
        <br />
        <button
          type="submit"
          className={styles.button}
          onClick={handleLoginButton}
        >
          로그인
        </button>
        <br />
        <Link to={`/register`}>
          <button type="submit" className={styles.button}>
            회원가입 창으로 이동
          </button>
        </Link>
      </form>
    </div>
  );
};

export default MainPage;
