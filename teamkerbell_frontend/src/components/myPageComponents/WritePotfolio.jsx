// src/team.js
import React from "react";
import styles from "./WritePotfolio.module.css";

const WritePortfolio = () => {
  return (
    <div className={styles.title}>
      <h1>이력서 작성하기</h1>
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

      <div className={styles.baeckjoon}>
        <div className={styles.backjoonItem}>
          <div className={styles.infoName}>
            <h3>백준 티어</h3>
            <span className={styles.redColor}> *</span>
          </div>
          <form>
            <input placeholder="백준에서 사용하시는 이메일을 입력해주세요"></input>
            <button>Save</button>
          </form>
        </div>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>자기 소개</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input placeholder="ex) 안녕하세요. 풀스택 개발자 홍동국입니다! 저는 밝고 청량한 성격으로 항상 팀원들의 분위기를 살펴주고, 팀원들과 함께 이뤄나가는 것을 지향합니다."></input>
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>기술 스택</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input placeholder="ex) 안녕하세요. 풀스택 개발자 홍동국입니다! 저는 밝고 청량한 성격으로 항상 팀원들의 분위기를 살펴주고, 팀원들과 함께 이뤄나가는 것을 지향합니다."></input>
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>프로젝트 경험</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input placeholder="ex) 저는 기존에 동국톤에 나가 ~~~~~"></input>
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>Github</h3>
          <span className={styles.redColor}>*</span>
        </div>
        <form>
          <input placeholder="ex) 홍길동"></input>
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>기타 SNS ex.Instagram, Facebook, T-Stroy 등</h3>
          <span className={styles.redColor}>*</span>
        </div>
        <form>
          <input placeholder="ex) 인스타 :@999999999jin"></input>
        </form>
      </div>

      <div className={styles.editprofilebuttons}>
        <button className={styles.editprofileCancleButton}>Cancle</button>
        <button className={styles.editprofileSaveButton}>Save</button>
      </div>
    </div>
  );
};

export default WritePortfolio;
