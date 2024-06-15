import React from "react";
import styles from "./CompDetail.module.css"; 


const CompDetail = ({ image, title, period, daycount, organization, theme, qualification, apply, awards, inquiry, link }) => {

  
  return (
    <div className={styles.CompDetail}>
      <h2 className = {styles.title}>{title}</h2>

      <div className={styles.grid}>
        <img src={image}  alt={title} className={styles.image} />

        <ul className={styles.description}>
          <li className={styles.li}>
            <span className={styles.label}>접수 기간 </span> 
            <span className={styles.content}>
              {period} 
              <span className={styles.daycount}>D-{daycount}</span>
            </span>  
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>기관 </span>
            <span className={styles.content}>{organization}</span>
          </li>

          <li className={styles.li}>
            <span className={styles.label}>공모 주제 </span>
            <span className={styles.content}>{theme}</span>
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>지원 자격 </span>
            <span className={styles.content}>{qualification}</span>
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>지원 방법 </span>
            <span className={styles.content}>{apply}</span>
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>시상 </span>
            <span className= {styles.content}>{awards}</span>
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>문의 사항 </span>
            <span className={styles.content}>{inquiry}</span>
          </li>
          
          <li className={styles.li}>
            <span className={styles.label}>자세히 보기 </span>
            <span className={styles.content}><a href={link}>{link}</a></span>
           
          </li>

        </ul>
      </div>
      
    </div>  
    
  );
};

export default CompDetail;
