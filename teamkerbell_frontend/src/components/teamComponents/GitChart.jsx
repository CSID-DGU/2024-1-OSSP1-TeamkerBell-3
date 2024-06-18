import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  fetchContributors,
  fetchCommitStats,
  fetchRateLimit,
  fetchWeeklyData,
  extractOwnerAndRepo,
  loadAndPrepareGraphData,
  prepareWeeklyGraphData,
} from "../../utils/githubUtil";
import { getTeamProgress, postTeamProgress } from "../../api/team";
import styles from "./GitChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [gitUrl, setGitUrl] = useState();
  const [handlingGitUrl, setHandlingGitUrl] = useState();
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState({});
  const [linesOfCode, setLinesOfCode] = useState({});
  const [rateLimit, setRateLimit] = useState({});
  const [weeklyData, setWeeklyData] = useState({});
  const [weeklyLabels, setWeeklyLabels] = useState({});
  const [loading, setLoading] = useState(false);
  const [weeklyGraphData, setWeeklyGraphData] = useState({});
  const teamId = localStorage.getItem("tid");

  useEffect(() => {
    const initializeGitUrl = async () => {
      try {
        const response = await getTeamProgress(teamId);
        setGitUrl(response.data.repository);
        setHandlingGitUrl(response.data.repository);
      } catch (error) {
        console.log(error);
      }
    };
    if (teamId) {
      initializeGitUrl();
    }
  }, [teamId]); // teamId가 있을 때만 실행

  // useEffect for fetching and setting initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { owner, repo } = await extractOwnerAndRepo(gitUrl);
        await fetchData(owner, repo);
        await fetchWeeklyDatafunction(owner, repo);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    if (gitUrl) {
      // gitUrl이 있을 때만 실행
      fetchInitialData();
    }
  }, [gitUrl]);

  const handleChange = (e) => {
    setHandlingGitUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTeamProgress(teamId, {}, handlingGitUrl);
  };

  const handlingGraphButton = async () => {
    const { owner, repo } = await extractOwnerAndRepo(gitUrl);
    await fetchData(owner, repo);
    try {
      await fetchWeeklyDatafunction(owner, repo);
    } catch (error) {
      // Handle errors here (e.g., display an error message to the user)
      console.error("Error fetching weekly graph data:", error);
    }
  };

  const fetchData = async (owner, repo) => {
    setLoading(true);
    try {
      const rateLimitData = await fetchRateLimit();
      setRateLimit(rateLimitData.rate);

      const contributorsData = await fetchContributors(owner, repo);
      setContributors(contributorsData);

      const commitStats = {};
      const locStats = {};
      const totalLines = {};

      for (let contributor of contributorsData) {
        const commits = await fetchCommitStats(owner, repo, contributor.login);
        commitStats[contributor.login] = commits.length;

        let added = 0;
        let deleted = 0;

        for (let commit of commits) {
          if (commit.stats) {
            added += commit.stats.additions;
            deleted += commit.stats.deletions;
          }
        }
        locStats[contributor.login] = added - deleted;
        totalLines[contributor.login] = added + deleted;
      }
      // commit stats 가져오기

      setCommits(commitStats);
      // commit stats 등록하기
      setLinesOfCode(locStats);

      const data = await fetchWeeklyData(owner, repo, contributorsData);
      setWeeklyData(data);
      setWeeklyLabels(Object.keys(weeklyData));
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyDatafunction = async (owner, repo) => {
    await loadAndPrepareGraphData(fetchWeeklyData, owner, repo, contributors)
      .then((data) => {
        setWeeklyGraphData(data);
      })
      .catch((error) => {
        console.error("Error loading weekly graph data:", error);
      });
  };

  const commitData = {
    labels: contributors.map((contributor) => contributor.login),
    datasets: [
      {
        label: "Commits",
        data: contributors.map(
          (contributor) => commits[contributor.login] || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Lines of Code",
        data: contributors.map(
          (contributor) => linesOfCode[contributor.login] || 0
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h3>
        API Rate Limit: {rateLimit.remaining} / {rateLimit.limit}
      </h3>
      <form onSubmit={handleSubmit}>
        <label className={styles.text}>
          GitHub URL:
          <input
            type="text"
            value={handlingGitUrl}
            onChange={handleChange}
            className={styles.textInput}
          />
        </label>
        <button type="submit" className={styles.buttons}>
          URL 설정하기
        </button>
      </form>
      <button onClick={handlingGraphButton} className={styles.buttons}>
        주간 그래프 보기
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>GitHub 커밋 수</h3>
          <div></div>
          <Bar
            data={commitData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Commits and Lines of Code by Contributor",
                },
              },
            }}
          />

          <h3>주간 코드 작성량</h3>
          {weeklyLabels.length ? (
            <Bar
              data={weeklyGraphData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Weekly Code Additions by Contributor",
                  },
                },
              }}
            />
          ) : (
            <p>No weekly data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
