import React from "react";
import styles from "./TeamCard.module.css"; // TeamCard 컴포넌트의 스타일


const TeamCard = ({ image, title, writer, membernum, startdate,dday, jobs, languages }) => {
  return (
    <div className={styles.teamCard}>
        <div className={styles.profile}>
            <img src={image} alt={title} className={styles.image} />
            <p className={styles.writer}>{writer}</p>
            <p className={styles.dday}>D{dday}</p>

        </div>

        <div className={styles.description}>
            <h2 className={styles.title}>{title}</h2>
            <p className = {styles.subdescription}>
                <div className = {styles.membernum}>
                    <span className = {styles.content}>모집 인원:</span>{membernum}명
                </div>
                <div className = {styles.startdate}>
                    <span className = {styles.content}>시작 날짜:</span>{startdate}
                </div>
                <div className = {styles.jobs}>
                    <span className = {styles.content}>모집 분야:</span>{jobs}
                </div>
                <div className = {styles.languages}>
                    <span className = {styles.content}>사용 언어:</span>{languages}
                </div>
                
            </p>
        </div>
        
      

      

      

      
      
    </div>
  );
};

export default TeamCard;
