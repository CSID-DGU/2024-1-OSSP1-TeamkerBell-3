import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import moment from "moment";
import styles from "./Calendar.module.css";
import "react-calendar/dist/Calendar.css";

Modal.setAppElement("#root");

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [selectedDateSchedules, setSelectedDateSchedules] = useState([]); // 선택한 날짜의 일정을 저장하기 위한 상태

  const [mark, setMark] = useState({});
  const [clickTimeout, setClickTimeout] = useState(null);

  useEffect(() => {
    const todayStr = moment(new Date()).format("YYYY-MM-DD");
    if (mark[todayStr]) {
      setSelectedDateSchedules(mark[todayStr]);
    } else {
      setSelectedDateSchedules([]);
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  const onChange = (value) => {
    if (clickTimeout === null) {
      const newTimeout = setTimeout(() => {
        setValue(value); // 단일 클릭 처리
        const selectedDateStr = moment(value).format("YYYY-MM-DD");
        if (mark[selectedDateStr]) {
          setSelectedDateSchedules(mark[selectedDateStr]);
        } else {
          setSelectedDateSchedules([]);
        }
        setClickTimeout(null);
      }, 200); // 200ms 내에 다음 클릭이 없으면 단일 클릭으로 간주
      setClickTimeout(newTimeout);
    } else {
      clearTimeout(clickTimeout); // 타이머 취소
      setClickTimeout(null);
      setModalIsOpen(true); // 더블 클릭 처리
    }
  };

  const fillDatesBetween = (start, end, newSchedule) => {
    let currentDate = moment(start);
    const updatedMark = { ...mark };

    while (currentDate <= moment(end)) {
      const currentDateStr = currentDate.format("YYYY-MM-DD");
      if (updatedMark[currentDateStr]) {
        updatedMark[currentDateStr].push(newSchedule);
      } else {
        updatedMark[currentDateStr] = [newSchedule];
      }
      currentDate = currentDate.add(1, "days");
    }

    return updatedMark;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMark = fillDatesBetween(startDate, endDate, schedule);
    setMark(updatedMark);
    setModalIsOpen(false);
  };

  const today = moment(new Date());
  return (
    <div>
      <h3>오늘의 날짜: {today.format("YYYY년 MM월 DD일")}</h3>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        className={styles.calendar}
        tileContent={({ date, view }) => {
          const dateStr = moment(date).format("YYYY-MM-DD");
          if (mark[dateStr]) {
            return (
              <div className={styles.dotContainer}>
                {mark[dateStr].map((schedule, index) => (
                  <div key={index} className={styles.dot}></div>
                ))}
              </div>
            );
          }
        }}
        tileClassName={({ date, view }) => {
          // 토요일에 해당하는 날짜를 파란색으로 표시
          if (date.getDay() === 6) {
            // 자바스크립트에서는 일요일이 0, 토요일이 6입니다.
            return styles.saturday;
          }
        }}
      />
      <h3>선택한 날의 일정</h3>
      {selectedDateSchedules.length > 0 ? (
        selectedDateSchedules.map((schedule, index) => (
          <div key={index}>{schedule}</div>
        ))
      ) : (
        <p>일정이 없습니다.</p>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2 className={styles.title}>일정 설정</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.date}>
            시작 날짜:
            <input
              className={styles.input}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label className={styles.date}>
            종료 날짜:
            <input
              className={styles.input}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <br />
          <input
            className={styles.inputtodo}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="팀원들의 일정을 작성해보세요!"
          ></input>
          <button className={styles.submit} type="submit">일정 저장</button>
        </form>

        <div>
          <h2 className={styles.title}>선택한 날짜의 일정</h2>
          {selectedDateSchedules.length > 0 ? (
            selectedDateSchedules.map((schedule, index) => (
              <div key={index} className={styles.todo}>{schedule}</div>
            ))
          ) : (
            <p className={styles.todo}>일정이 없습니다.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
