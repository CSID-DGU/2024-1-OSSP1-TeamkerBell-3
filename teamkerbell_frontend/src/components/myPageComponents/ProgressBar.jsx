import React from "react";

const ProgressBar = ({ temperature }) => {
  return (
    <div
      style={{
        marginTop: "30px",
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: "15px",
        height: "20px",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${(temperature / 50) * 100}%`,
          height: "20px",
          backgroundColor: "#006322",
          borderRadius: "15px",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: `${(36.5 / 50) * 100}%`, // Adjust arrow position
          transform: "translate(-50%, 0)",
        }}
      >
        <span style={{ marginLeft: "5px", fontSize: "20px" }}>36.5도</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: `${(temperature / 50) * 100}%`, // Adjust arrow position
          transform: "translate(-16%, 0)",
        }}
      >
        <span role="img" aria-label="arrow" style={{ fontSize: "24px" }}></span>
        <span style={{ marginLeft: "5px", fontSize: "20px", color: "" }}>
          ☝🏻{temperature.toFixed(1)} 도
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
