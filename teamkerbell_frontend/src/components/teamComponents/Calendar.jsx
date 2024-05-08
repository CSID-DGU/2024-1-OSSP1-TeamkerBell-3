import React, { useState } from "react";
import Calendar from "react-calendar";
import styles from "./Calendar.module.css";
import "react-calendar/dist/Calendar.css";

export default function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  return (
    <div className={styles.calendar}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
