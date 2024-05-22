import React, { useState } from "react";
import styles from "./compRegister.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerComp } from "../api/comp"; // Adjust the import path as needed

const CompRegister = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [organization, setOrganization] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");
  const [context, setContext] = useState("");
  const [reward, setReward] = useState("");
  const [contact, setContact] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerComp(
        name,
        startDate,
        endDate,
        organization,
        eligibility,
        applicationMethod,
        context,
        reward,
        contact,
        link,
        img
      );
      alert("공모전 등록이 완료되었습니다!");
    } catch (error) {
      console.error("Error registering competition:", error);
      alert("공모전 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.title}>
      <h2>공모전 등록하기</h2>
      <div className={styles.basicInfo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.nameToPhoneNumber}>
            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3 className={styles.noMargin}>1. 공모전 제목</h3>
                <span className={styles.redColorNoMargin}>*</span>
              </div>
              <input
                name="name"
                placeholder="ex) 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>2. 공모전 구분</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="category"
                placeholder="ex) 동국교육진흥원"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>3. 접수 기간</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="모집 시작 일자를 선택하세요"
              />
              <br />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="마감 날짜를 선택하세요"
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>4. 공모 기관</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="organization"
                placeholder="ex) 동국교육진흥원"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>5. 지원 자격</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="eligibility"
                placeholder="ex) 전국 대학생"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoBigItem}>
              <div className={styles.infoName}>
                <h3>6. 지원 방법</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="applicationMethod"
                placeholder="ex) 동국대학교 사이트에서 신청"
                value={applicationMethod}
                onChange={(e) => setApplicationMethod(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoBigItem}>
              <div className={styles.infoName}>
                <h3>7. 공모전 내용</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="context"
                placeholder="ex) IT 해커톤 공모전!!"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>8. 시상</h3>
              </div>
              <input
                name="reward"
                placeholder="ex) 1등: 500만원, 2등 100만원, 3등 50만원"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>9. 문의처</h3>
              </div>
              <input
                name="contact"
                placeholder="ex) 동국대학교 공식 홈페이지"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>10. 참고 링크</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="link"
                placeholder="ex) https://www.dongguk.edu/main"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoBigItem}>
              <div className={styles.infoName}>
                <h3>11. 사진 첨부</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                required
              />
            </div>

            <button className={styles.submitButton} type="submit">
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompRegister;
