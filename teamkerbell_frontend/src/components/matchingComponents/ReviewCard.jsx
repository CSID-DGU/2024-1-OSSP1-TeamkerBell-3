import React from "react";
import styles from "./ReviewCard.module.css"; 

const ReviewCard = ({review}) => {
    
    return(
    <div className = {styles.oneReviewContainer}>
        <img
        src={"../../../reviewprofile.svg"}
        alt="reviewprofile"
        className={styles.profile}
        />
        <div className = {styles.content}>{review}</div>
    </div>
    );
    
}

export default ReviewCard;
