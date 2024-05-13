// src/team.js
import React from "react";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  return (
    <div className={styles.title}>
      <h1>프로필 편집</h1>
      <div className={styles.basicInfo}>
        <img src="/dummy_profile.png" alt="프로필 사진" />
        <div className={styles.nameToPhoneNumber}>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3 className={styles.noMargin}>성명</h3>
              <span className={styles.redColorNoMargin}>*</span>
            </div>

            <form>
              <input placeholder="ex) 홍길동"></input>
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>이메일</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) hkj0206@dgu.ac.kr"></input>
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>연락처</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) 010-5820-4625"></input>
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>관심분야</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) IT/디자인"></input>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.editprofilebuttons}>
        <button className={styles.editprofileCancleButton}>Cancle</button>
        <button className={styles.editprofileSaveButton}>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
