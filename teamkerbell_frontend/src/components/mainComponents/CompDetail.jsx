import React from "react";
import styles from "./CompDetail.module.css"; // CompCard 컴포넌트의 스타일 파일




const CompDetail = ({ image, title, period, organization, theme, qualification, apply, award, inquiry, link }) => {
  return (
    <div className={styles.CompDetail}>
      <h2 className = {styles.title}>{title}</h2>

      
      <img src={image} className={styles.image} />
      
      <ul className={styles.description}>
        <li className = {styles.period}>접수 기간: {period}</li>
        <li className = {styles.organization}>기관: {organization}</li>
        <li className = {styles.theme}>공모 주제: {theme}</li>
        <li className = {styles.qualification}>지원 자격: {qualification}</li>
        <li className = {styles.apply}>지원 방법: {apply}</li>
        <li className = {styles.award}>시상: {award}</li>
        <li className = {styles.inquiry}>문의 사항: {inquiry}</li>
        <li className = {styles.link}>자세히 보기</li>
        {link}
      </ul>
    
    </div>  
      
    
  );
};

export default CompDetail;
