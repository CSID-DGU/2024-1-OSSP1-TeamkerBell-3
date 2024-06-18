import React, { useEffect, useState } from "react";
import styles from "./report.module.css";
import LeftSide from "../components/teamComponents/LeftSide";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import { getTeamReport, sendTeamReport } from "../api/team";
import Report from "../components/teamComponents/Report";

const RePort = () => {
  const setCategoryState = useSetRecoilState(categoryState);
  const { tid } = useParams();
  const [reportInfo, setReportInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook 추가
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    nickname: "팀원 선택",
  });

  const [rude, setRude] = useState("");
  const [reporter, setReporter] = useState(2);

  useEffect(() => {
    console.log("[reporter]:", localStorage.userId);

    const fetchReportInfo = async () => {
      setCategoryState(1);
      setIsLoading(true);

      try {
        const responseGet = await getTeamReport(tid);
        setReportInfo(responseGet.data);
        console.log("[reportInfo]:", responseGet.data);

        if (responseGet.data) {
          const filterInfo = responseGet.data.filter((list) => {
            return list.id.toString() !== localStorage.userId; // 조건에 맞는 멤버를 제외
          });
          setReportInfo(filterInfo);
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage(
          "비매너신고 기본정보를 불러오는 중 오류가 발생했습니다."
        );
        console.error("Error fetching team report detail: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportInfo();
  }, [tid, setCategoryState]);

  const inputContent = (event) => {
    setRude(event.target.value);
  };

  const send = async () => {
    try {
      setReporter(localStorage.userId);

      if (selectedItem.id == null) {
        alert("신고 대상을 선택해주세요");
        return;
      } else if (rude === "") {
        alert("신고 이유를 적어주세요");
        return;
      }

      const responseSend = await sendTeamReport(
        tid,
        selectedItem.id,
        rude,
        localStorage.userId
      );

      // 로그 출력
      console.log("[Post]:", responseSend);

      // sendTeamReport 함수가 성공적으로 실행된 경우에만 아래 코드 실행
      alert("신고가 접수되었습니다.");
      navigate(`/`); // 완료시 메인화면으로
    } catch (responseError) {
      if (
        responseError.response &&
        responseError.response.status === 400 &&
        responseError.response.data.message === "report already saved "
      ) {
        alert("중복 신고는 불가능합니다");
        navigate(`/`); // 중복 신고 시도 시 메인화면으로
      } else {
        console.error("Error sending team evaluate:", responseError);
        alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView(false);
  };

  const [view, setView] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftSide />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <ErrorComponent message={errorMessage} />
      ) : (
        <div className={styles.main}>
          <Report />
          <div className={styles.describe}>
            ※ 아래 경우에 해당할 시, 서비스 이용이 제한되며, 법적 책임을 물을 수
            있습니다. 유의하시기 바랍니다. <br />
            1) 사실에 기반하지 않은 내용 작성 시 <br />
            2) 단순 비방, 욕설을 포함하는 경우
          </div>
          <div>
            <ul
              className={styles.list}
              onClick={() => {
                setView(!view);
              }}
            >
              <div>
                <div className={styles.select}>
                  <span>{selectedItem.nickname}</span>
                  <span>{view ? "∧" : "∨"}</span>
                </div>
              </div>

              {view && (
                <ul className={styles.list2}>
                  {reportInfo &&
                    reportInfo.map((content, index) => (
                      <li
                        className={styles.nameSelect}
                        key={index}
                        onClick={() => handleItemClick(content)}
                      >
                        {content.nickname}
                      </li>
                    ))}
                </ul>
              )}
            </ul>
          </div>
          <textarea
            className={styles.boxInput}
            placeholder="신고 이유를 적어주세요"
            value={rude}
            onChange={inputContent}
          ></textarea>
          <div>
            <button onClick={send} className={styles.submitsBtn}>
              제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RePort;
