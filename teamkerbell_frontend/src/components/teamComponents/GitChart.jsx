import React, { useState } from "react";
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
  fetchCodeFrequency,
  extractOwnerAndRepo,
  loadAndPrepareGraphData,
} from "../../utils/githubUtil";

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
  const [gitUrl, setGitUrl] = useState(
    "https://github.com/CSID-DGU/2024-1-OSSP1-TeamkerBell-3"
  );
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState({});
  const [linesOfCode, setLinesOfCode] = useState({});
  const [rateLimit, setRateLimit] = useState({});
  const [codeFrequency, setCodeFrequency] = useState([]);
  const [weeklyData, setWeeklyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [weeklyGraphData, setWeeklyGraphData] = useState({});

  const handleChange = (e) => {
    setGitUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { owner, repo } = extractOwnerAndRepo(gitUrl);
    fetchData(owner, repo);
    fetchCodeFrequencyData(owner, repo);
    fetchWeeklyDatafunction(owner, repo);
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

      setCommits(commitStats);
      setLinesOfCode(locStats);

      const weeklyData = await fetchWeeklyData(owner, repo, contributorsData);
      console.log("weeklyData :" + weeklyData);
      setWeeklyData(weeklyData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyData = async (owner, repo, contributors) => {
    const weeklyData = {};

    for (let contributor of contributors) {
      const commits = await fetchCommitStats(owner, repo, contributor.login);
      for (let commit of commits) {
        const week = new Date(commit.commit.author.date).toLocaleDateString();
        if (!weeklyData[week]) {
          weeklyData[week] = {};
        }
        if (!weeklyData[week][contributor.login]) {
          weeklyData[week][contributor.login] = 0;
        }
        weeklyData[week][contributor.login] += commit.stats.additions;
      }
    }

    return weeklyData;
  };

  const fetchCodeFrequencyData = async (owner, repo) => {
    setLoading(true);
    try {
      const data = await fetchCodeFrequency(owner, repo);
      setCodeFrequency(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching code frequency data", error);
      setCodeFrequency([]);
    } finally {
      setLoading(false);
    }
  };

  const weeks = codeFrequency.map((week) =>
    new Date(week[0] * 1000).toLocaleDateString()
  );

  const additions = codeFrequency.map((week) => week[1]);
  const deletions = codeFrequency.map((week) => Math.abs(week[2])); // Absolute value for deletions

  // Calculating cumulative additions and deletions
  const cumulativeAdditions = additions.reduce((acc, cur, idx) => {
    acc.push((acc[idx - 1] || 0) + cur);
    return acc;
  }, []);

  const cumulativeDeletions = deletions.reduce((acc, cur, idx) => {
    acc.push((acc[idx - 1] || 0) + cur);
    return acc;
  }, []);

  const cumulativeData = {
    labels: weeks,
    datasets: [
      {
        label: "Cumulative Additions",
        data: cumulativeAdditions,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        lineTension: 0.1,
      },
      {
        label: "Cumulative Deletions",
        data: cumulativeDeletions,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        lineTension: 0.1,
      },
    ],
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

  const weeklyLabels = Object.keys(weeklyData);
  const weeklyDatasets = contributors.map((contributor) => ({
    label: contributor.login,
    data: weeklyLabels.map((week) => weeklyData[week][contributor.login] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
  }));

  const fetchWeeklyDatafunction = async (owner, repo) => {
    await loadAndPrepareGraphData(fetchWeeklyData, owner, repo, contributors)
      .then((data) => {
        setWeeklyGraphData(data);
      })
      .catch((error) => {
        console.error("Error loading weekly graph data:", error);
      });
  };

  return (
    <div>
      <h3>
        API Rate Limit: {rateLimit.remaining} / {rateLimit.limit}
      </h3>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub URL:
          <input type="text" value={gitUrl} onChange={handleChange} />
        </label>
        <button type="submit">그래프 보기</button>
      </form>
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
          {codeFrequency.length ? (
            <>
              <h2>누적 Code 작성 진척도</h2>
              <Line
                data={cumulativeData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: {
                      display: true,
                      text: "Cumulative Code Additions and Deletions Over Time",
                    },
                  },
                }}
              />
            </>
          ) : (
            <p>No code frequency data available.</p>
          )}
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
