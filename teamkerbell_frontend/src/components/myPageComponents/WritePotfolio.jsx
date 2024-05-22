// src/team.js
import React, { useState } from "react";
import styles from "./WritePotfolio.module.css";

const WritePortfolio = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interest, setInterest] = useState("");
  const [baekjoonTier, setBaekjoonTier] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectExperience, setProjectExperience] = useState("");
  const [github, setGithub] = useState("");
  const [sns, setSns] = useState("");

  const handleSave = () => {
    // Implement save logic here
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log("Cancel button clicked");
  };

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
              <input
                placeholder="ex) 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

      <div className={styles.baeckjoon}>
        <div className={styles.backjoonItem}>
          <div className={styles.infoName}>
            <h3>백준 티어</h3>
            <span className={styles.redColor}> *</span>
          </div>
          <form>
            <input
              placeholder="백준에서 사용하시는 이메일을 입력해주세요"
              value={baekjoonTier}
              onChange={(e) => setBaekjoonTier(e.target.value)}
            />
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>자기 소개</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) 안녕하세요. 풀스택 개발자 홍동국입니다! 저는 밝고 청량한 성격으로 항상 팀원들의 분위기를 살펴주고, 팀원들과 함께 이뤄나가는 것을 지향합니다."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>기술 스택</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) React, Node.js, Python"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.introduceMyself}>
        <div className={styles.infoName}>
          <h3>프로젝트 경험</h3>
          <span className={styles.redColor}> *</span>
        </div>
        <form>
          <input
            placeholder="ex) 저는 기존에 동국톤에 나가 ~~~~~"
            value={projectExperience}
            onChange={(e) => setProjectExperience(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>Github</h3>
          <span className={styles.redColor}>*</span>
        </div>
        <form>
          <input
            placeholder="ex) https://github.com/username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.github}>
        <div className={styles.infoName}>
          <h3>기타 SNS ex.Instagram, Facebook, T-Stroy 등</h3>
          <span className={styles.redColor}>*</span>
        </div>
        <form>
          <input
            placeholder="ex) 인스타 :@999999999jin"
            value={sns}
            onChange={(e) => setSns(e.target.value)}
          />
        </form>
      </div>

      <div className={styles.editprofilebuttons}>
        <button
          className={styles.editprofileCancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className={styles.editprofileSaveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WritePortfolio;
