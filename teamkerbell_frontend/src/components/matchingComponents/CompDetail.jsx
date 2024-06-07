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
                <span className={styles.label}>접수 기간 </span> {period}   
                <div className={styles.daycount}>
                    D-{daycount}
                </div>
            </div>
          </li>
          <li>
            <span className={styles.label}>기관 </span>
             {organization}</li>
          <li>
            <span className={styles.label}>공모 주제 </span>
             {theme}</li>
          <li>
            <span className={styles.label}>지원 자격 </span>
             <div className={styles.content}>{qualification}</div></li>
          <li>
            <span className={styles.label}>지원 방법 </span>
            <div className={styles.content}>{apply}</div></li>
          <li>
            <span className={styles.label}>시상 </span>
            <div className= {styles.content}>{awards}</div></li>
          <li>
            <span className={styles.label}>문의 사항 </span>
            <div>{inquiry}</div></li>
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
