// src/Login.js
import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { register } from "../api/user";
const RegisterPage = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNickname, setRegisterNickname] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const handleRegisterButton = (e) => {
    e.preventDefault();
    if (!registerId || !registerPassword || !registerNickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    const response = register(
      registerNickname,
      registerId,
      registerPassword,
      registerPhoneNumber
    );
    console.log(response);
    console.log("회원가입 중....");
    console.log("아이디: ", registerId);
    console.log("전화번호: ", registerPhoneNumber);
    console.log("비밀번호: ", registerPassword);
    console.log("닉네임: ", registerNickname);
  };

  return (
    <div className={styles.container}>
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
