import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import {
  fetchContributors,
  fetchCommitStats,
  fetchRateLimit,
  fetchCodeFrequency,
} from "../../utils/githubUtil";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [owner, setOwner] = useState("CSID-DGU");
  const [repo, setRepo] = useState("2024-1-OSSP1-TeamkerBell-3");
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState({});
  const [linesOfCode, setLinesOfCode] = useState({});
  const [totalLinesChanged, setTotalLinesChanged] = useState({});
  const [rateLimit, setRateLimit] = useState({});
  const [codeFrequency, setCodeFrequency] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rateLimitData = await fetchRateLimit();
        setRateLimit(rateLimitData.rate);

        const contributorsData = await fetchContributors(owner, repo);
        setContributors(contributorsData);

        const commitStats = {};
        const locStats = {};
        const totalLines = {};

        for (let contributor of contributorsData) {
          const commits = await fetchCommitStats(
            owner,
            repo,
            contributor.login
          );
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
        setTotalLinesChanged(totalLines);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [owner, repo]);

  useEffect(() => {
    const fetchCodeFrequencyData = async () => {
      try {
        const data = await fetchCodeFrequency(owner, repo);
        setCodeFrequency(data);
      } catch (error) {
        console.error("Error fetching code frequency data", error);
      }
    };

    fetchCodeFrequencyData();
  }, [owner, repo]);

  const weeks = codeFrequency.map((week) =>
    new Date(week[0] * 1000).toLocaleDateString()
  );
  const additions = codeFrequency.map((week) => week[1]);
  const deletions = codeFrequency.map((week) => week[2]);

  const codeFrequencyData = {
    labels: weeks,
    datasets: [
      {
        label: "Additions",
        data: additions,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Deletions",
        data: deletions,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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

  const linesData = {
    labels: contributors.map((contributor) => contributor.login),
    datasets: [
      {
        label: "Total Lines Changed",
        data: contributors.map(
          (contributor) => totalLinesChanged[contributor.login] || 0
        ),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>
        API Rate Limit: {rateLimit.remaining} / {rateLimit.limit}
      </h2>
      <h2>GitHub 커밋 수</h2>
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

      <h2>GitHub Code 작성 추이</h2>
      <Bar
        data={codeFrequencyData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Code Additions and Deletions Over Time",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
