// src/Login.js
import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";
const RegisterPage = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNickname, setRegisterNickname] = useState("");

  const handleRegisterButton = (e) => {
    e.preventDefault();
    if (!registerId || !registerPassword || !registerNickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    axios
      .post("http://localhost:8000/user/register", {
        email: registerId,
        password: registerPassword,
        nickname: registerNickname,
      })
      .then((response) => {
        console.log("POST 요청 성공:", response);
        // 성공적으로 요청이 완료되면 상태를 초기화하거나 다른 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error("POST 요청 실패:", error);
        // 요청이 실패한 경우 오류 처리를 수행할 수 있습니다.
      });
    console.log("회원가입 중....");
    console.log("아이디: ", registerId);
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
      </form>
    </div>
  );
};

export default RegisterPage;
