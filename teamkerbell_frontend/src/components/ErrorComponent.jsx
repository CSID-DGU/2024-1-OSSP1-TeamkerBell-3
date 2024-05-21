// src/components/ErrorComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = ({ message }) => {
  const navigate = useNavigate();

  const handleNavigateToMain = () => {
    navigate("/"); // Adjust the path to the main page as needed
  };

  return (
    <div className={styles.error}>
      <h1>Error</h1>
      <p>{message}</p>
      <button onClick={handleNavigateToMain}>메인 페이지로 이동</button>
    </div>
  );
};

export default ErrorComponent;
