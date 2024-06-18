import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./calendarstyles.css";
import styles from "./Calendar.module.css";
import {
  deleteTeamSchedule,
  getTeamProgress,
  postTeamSchedule,
} from "../../api/team";

Modal.setAppElement("#root");

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [scheduleColor, setScheduleColor] = useState("rgba(245, 4, 72)"); // Default color for new schedules
  const [selectedDateSchedules, setSelectedDateSchedules] = useState([]); // 선택한 날짜의 일정을 저장하기 위한 상태

  const [mark, setMark] = useState({});
  const [clickTimeout, setClickTimeout] = useState(null);
  const teamId = localStorage.getItem("tid");
  const fetchTeamSchedule = async () => {
    try {
      const response = await getTeamProgress(teamId);
      const fetchedSchedules = response.data.scheduleList;

      // Process fetched schedules
      const markData = {};
      fetchedSchedules.forEach((schedule) => {
        const start = moment(schedule.startDate);
        const end = moment(schedule.endDate);

        // Include the schedule id in the markData
        fillDatesBetween(
          start,
          end,
          {
            id: schedule.id, // Include the id
            schedule: schedule.schedule,
            color: schedule.color,
          },
          markData
        );
      });

      setMark(markData);
      const today = new Date();
      setValue(today);
      const todayStr = moment(today).format("YYYY-MM-DD");
      if (mark[todayStr]) {
        setSelectedDateSchedules(mark[todayStr]);
      }
    } catch (error) {
      console.error("Error fetching team schedule:", error);
    }
  };

  useEffect(() => {
    fetchTeamSchedule();
  }, []);

  const onChange = (value) => {
    console.log(value);
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
      setStartDate(moment(value).format("YYYY-MM-DD"));
      setEndDate(moment(value).format("YYYY-MM-DD"));
      setClickTimeout(null);
      setModalIsOpen(true); // 더블 클릭 처리
    }
  };

  const fillDatesBetween = (start, end, newSchedule, markData) => {
    let currentDate = moment(start);

    while (currentDate <= moment(end)) {
      const currentDateStr = currentDate.format("YYYY-MM-DD");
      if (!markData[currentDateStr]) {
        markData[currentDateStr] = [];
      }
      markData[currentDateStr].push(newSchedule);
      currentDate = currentDate.add(1, "days");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postTeamSchedule(teamId, startDate, endDate, schedule, scheduleColor);
    setModalIsOpen(false);
  };

  const deleteSchedule = async (id) => {
    try {
      const response = await deleteTeamSchedule(teamId, {
        deleteList: [{ id: id }],
      });
      if (response.status === 200) {
        alert("일정이 삭제되었습니다.");
        fetchTeamSchedule();
        // Update selectedDateSchedules
        const selectedDateStr = moment(value).format("YYYY-MM-DD");
        setSelectedDateSchedules(mark[selectedDateStr] || []);
      }
    } catch (error) {
      console.error("Error deleting team schedule:", error);
    }
  };

  const today = moment(new Date());
  return (
    <div>
      <h2 className={styles.today}>
        오늘의 날짜: {today.format("YYYY년 MM월 DD일")}
      </h2>
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
                  <div
                    key={index}
                    className={styles.dot}
                    style={{ backgroundColor: schedule.color }}
                  ></div>
                ))}
              </div>
            );
          }
        }}
        tileClassName={({ date, view }) => {
          let classes = "";
          if (moment(value).isSame(date, "day")) {
            // 선택된 날짜
            classes += ` ${styles.selectedDay}`;
          }
          if (date.getDay() === 6) {
            // 토요일
            classes += styles.saturday;
          }

          return classes;
        }}
      />
      <h2 className={styles.title}>선택한 날의 일정</h2>
      {selectedDateSchedules.length > 0 ? (
        selectedDateSchedules.map((schedule, index) => (
          <div
            key={index}
            className={styles.todo}
            style={{ borderLeftColor: schedule.color }}
          >
            <div className={styles.todoContent}>{schedule.schedule}</div>
            <button
              className={styles.deleteButton}
              onClick={() => deleteSchedule(schedule.id)} // Pass schedule.id directly
              aria-label="Delete schedule"
            >
              X
            </button>
          </div>
        ))
      ) : (
        <p className={styles.todo}>일정이 없습니다.</p>
      )}

      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2 className={styles.title}>일정 설정</h2>
        <button
          className={styles.closemodal}
          onClick={() => setModalIsOpen(false)}
        >
          <img src="/Close.png" alt="close" />
        </button>
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
          <label className={styles.color}>
            <div className={styles.colorPicker}>
              <div
                className={`${styles.colorOption} ${
                  scheduleColor === "rgba(245, 4, 72)"
                    ? styles.selectedColorOption
                    : ""
                }`}
                style={{ backgroundColor: "rgba(245, 4, 72)" }}
                onClick={() => setScheduleColor("rgba(245, 4, 72)")}
                title="Red"
              ></div>
              <div
                className={`${styles.colorOption} ${
                  scheduleColor === "rgb(255, 230, 0)"
                    ? styles.selectedColorOption
                    : ""
                }`}
                style={{ backgroundColor: "rgb(255, 230, 0)" }}
                onClick={() => setScheduleColor("rgb(255, 230, 0)")}
                title="Yellow"
              ></div>
              <div
                className={`${styles.colorOption} ${
                  scheduleColor === "rgb(0, 0, 255)"
                    ? styles.selectedColorOption
                    : ""
                }`}
                style={{ backgroundColor: "rgb(0, 0, 255)" }}
                onClick={() => setScheduleColor("rgb(0, 0, 255)")}
                title="Blue"
              ></div>
            </div>
          </label>
          <br />
          <input
            className={styles.inputtodo}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="팀원들의 일정을 작성해보세요!"
          ></input>
          <button className={styles.submit} type="submit">
            일정 저장
          </button>
        </form>

        <div>
          <h2 className={styles.title}>선택한 날짜의 일정</h2>
          {selectedDateSchedules.length > 0 ? (
            selectedDateSchedules.map((schedule, index) => (
              <div
                key={index}
                className={styles.todo}
                style={{ borderLeftColor: schedule.color }}
              >
                <div className={styles.todoContent}>{schedule.schedule}</div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteSchedule(schedule.schedule)}
                  aria-label="Delete schedule"
                >
                  X
                </button>
              </div>
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
