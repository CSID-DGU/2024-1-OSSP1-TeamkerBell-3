import React from "react";
import styles from "./CompDetail.module.css"; 


const CompDetail = ({ image, title, period, daycount, organization, theme, qualification, apply, awards, inquiry, link }) => {

  
  return (
    <div className={styles.CompDetail}>
      <h2 className = {styles.title}>{title}</h2>

      <div className={styles.grid}>
        <img src={image}  alt={title} className={styles.image} />

        <ul className={styles.description}>
          <li>
            <div>
                접수 기간: {period}   
                <div className={styles.daycount}>
                    {daycount}
                </div>
            </div>
          </li>
          <li>기관: {organization}</li>
          <li>공모 주제: {theme}</li>
          <li>지원 자격: {qualification}</li>
          <li>지원 방법: {apply}</li>
          <li>시상:
            <div>
                {awards.map((award, index) => (
                    <div key={index}>{award}</div>
                ))}
            </div>
          </li>
          <li>문의 사항: {inquiry}</li>
          <li>
            자세히 보기
            <div>
                <a href = {link}>{link}</a>
            </div>
           </li>

        </ul>
      </div>
      
    </div>  
    
  );
};

export default CompDetail;
