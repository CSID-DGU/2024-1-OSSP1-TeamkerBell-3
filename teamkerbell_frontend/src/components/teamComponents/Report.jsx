import React from "react";
import styles from "./Report.module.css";

const Report = ({ reportInfo }) => {
  /*const [selectedItem, setSelectedItem] = useState({
    id: null,
    nickname: "팀원 선택",
  });

  const [view, setView] = useState(false);
  const [rude, setRude] = useState("");

  const inputContent = (event) => {
    setRude(event.target.value);
    console.log(event.target.value);
  };

  const send = () => {
    console.log("user:", selectedItem.id);
    console.log("rude:", rude);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView(false);
    console.log(item);
  };
*/
  return (
    <div>
      {" "}
      <h2 className={styles.title}>비매너 신고</h2>
      <hr className={styles.line} />
    </div>
  );
};

export default Report;
