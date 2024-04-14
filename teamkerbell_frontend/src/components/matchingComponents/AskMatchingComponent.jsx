import React from "react";
import styles from "./AskMatchingComponent.module.css"; 




const AskMatching = () => {


    return(
        <div className = {styles.askMatchingContainer}>
                <hr className={styles.line}></hr>
                <div className={styles.matchingContent}>
                  <p className = {styles.matchingQuestion}>해당 공모전을 함께할 팀원을 찾으시나요?</p>
                  <p className = {styles.nowMatching}>12명이 팀을 찾고 있어요!</p>
                </div>

                <div className={styles.matchingButtons}>
                  <button
                    //onClick
                    className={styles.matchingButton}>
                    랜덤 매칭
                  </button>
                  <button
                    //onClick
                    className={styles.matchingButton}>
                    선택 매칭
                  </button>
                </div>
            </div>
    );
}



export default AskMatching;
