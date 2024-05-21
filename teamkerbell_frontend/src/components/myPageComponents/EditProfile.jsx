// src/team.js
import React, { useState } from "react";
import styles from "./EditProfile.module.css";

const EditProfile = ({ initialNickname, initialEmail, initialPhoneNumber }) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [email, setEmail] = useState(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [interest, setInterest] = useState("");
  
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
              <input
                placeholder="ex) 홍길동"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>이메일</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) hkj0206@dgu.ac.kr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>연락처</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) 010-5820-4625"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </form>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>관심분야</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input
                placeholder="ex) IT/디자인"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
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
