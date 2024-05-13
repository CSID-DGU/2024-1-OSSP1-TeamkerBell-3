// src/team.js
import React, { useState } from "react";
import styles from "./compRegister.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // DatePicker 스타일 시트

const CompRegister = () => {
  const [startDate, setStartDate] = useState(null); // 선택된 날짜를 상태로 관리
  const [endDate, setEndDate] = useState(null); // 선택된 날짜를 상태로 관리

  return (
    <div className={styles.title}>
      <h2>공모전 등록하기</h2>
      <div className={styles.basicInfo}>
        <div className={styles.nameToPhoneNumber}>
          {/* 공모전 제목 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3 className={styles.noMargin}>1. 공모전 제목</h3>
              <span className={styles.redColorNoMargin}>*</span>
            </div>
            <form>
              <input placeholder="ex) 홍길동"></input>
            </form>
          </div>

          {/* 공모전 구분 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>2. 공모전 구분</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) 동국교육진흥원"></input>
            </form>
          </div>

          {/* 접수 기간 */}
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

          {/* 공모 기관 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>4. 공모 기관</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) 동국교육진흥원"></input>
            </form>
          </div>

          {/* 지원자격 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>5. 지원 자격</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) 전국 대학생"></input>
            </form>
          </div>

          {/* 지원 방법 */}
          <div className={styles.infoBigItem}>
            <div className={styles.infoName}>
              <h3>6. 지원 방법</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) 동국대학교 사이트에서 신청"></input>
            </form>
          </div>

          {/* 공모전 내용 */}
          <div className={styles.infoBigItem}>
            <div className={styles.infoName}>
              <h3>7. 공모전 내용</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) IT 해커톤 공모전!!"></input>
            </form>
          </div>

          {/* 시상 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>8. 시상</h3>
            </div>
            <form>
              <input placeholder="ex) 1등: 500만원, 2등 100만원, 3등 50만원"></input>
            </form>
          </div>

          {/* 문의처 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>9. 문의처</h3>
            </div>
            <form>
              <input placeholder="ex) 동국대학교 공식 홈페이지"></input>
            </form>
          </div>

          {/* 링크 */}
          <div className={styles.infoItem}>
            <div className={styles.infoName}>
              <h3>10. 참고 링크</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input placeholder="ex) https://www.dongguk.edu/main"></input>
            </form>
          </div>

          {/*사진 첨부*/}
          <div className={styles.infoBigItem}>
            <div className={styles.infoName}>
              <h3>11. 사진 첨부</h3>
              <span className={styles.redColor}> *</span>
            </div>
            <form>
              <input type="file" accept="image/*" />
            </form>
          </div>

          <button className={styles.submitButton}>제출</button>
        </div>
      </div>
    </div>
  );
};

export default CompRegister;
