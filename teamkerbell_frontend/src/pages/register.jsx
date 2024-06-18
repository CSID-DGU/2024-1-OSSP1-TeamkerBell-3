// src/Login.js
import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/user";
const RegisterPage = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNickname, setRegisterNickname] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // 오류 메시지 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleRegisterButton = async (e) => {
    e.preventDefault();
    if (!registerId || !registerPassword || !registerNickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await register(
        registerNickname,
        registerId,
        registerPassword,
        registerPhoneNumber
      );
      console.log(response);
      // 회원가입 성공 시 로그인 페이지로 이동
      alert("회원가입이 성공적으로 되었습니다!");
      navigate("/login");
    } catch (error) {
      // 회원가입 실패 시 오류 메시지 표시
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}{" "}
      {/* 오류 메시지 표시 */}
      <h2 className={styles.title}>TeamkerBell</h2>
      <h3 className={styles.quotes}>
        You still have enough time to make your dream come true.
      </h3>
      <h3 className={styles.subtitle}>회원가입</h3>
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
          type="text"
          className={styles.input}
          placeholder="닉네임"
          onChange={(e) => {
            setRegisterNickname(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="text"
          className={styles.input}
          placeholder="전화번호"
          onChange={(e) => {
            setRegisterPhoneNumber(e.target.value);
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
        <input
          type="password"
          className={styles.input}
          placeholder="비밀번호 확인"
          required
        />
        <br />
        <button
          type="submit"
          className={styles.button}
          onClick={handleRegisterButton}
        >
          회원가입
        </button>
        <br />
        <Link to={`/login`}>
          <button type="submit" className={styles.button}>
            로그인 창으로 이동
          </button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
