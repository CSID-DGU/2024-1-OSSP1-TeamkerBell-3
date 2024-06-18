// githubApi.js
import axios from "axios";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error(
    "GitHub token not found. Please set REACT_APP_GITHUB_TOKEN in your .env file."
  );
}

const axiosInstance = axios.create({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const extractOwnerAndRepo = (url) => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/").filter(Boolean); // 빈 문자열 제거

  // GitHub URL 형식에 따라, 첫 번째 요소는 사용자/조직, 두 번째 요소는 저장소 이름입니다.
  if (pathSegments.length >= 2) {
    console.log("owner :" + pathSegments[0]);
    console.log("repo :" + pathSegments[1]);
    return {
      owner: pathSegments[0],
      repo: pathSegments[1],
    };
  }
  return {
    owner: null,
    repo: null,
  };
};

export const fetchRateLimit = async () => {
  const url = "https://api.github.com/rate_limit";
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching rate limit", error);
    throw error;
  }
};

export const fetchContributors = async (owner, repo) => {
  const contributorUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  try {
    const response = await axiosInstance.get(contributorUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching contributors", error);
    throw error;
  }
};

export const fetchCommitStats = async (owner, repo, contributor) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?author=${contributor}&per_page=100`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching commit stats", error);
    throw error;
  }
};

export const fetchCodeFrequency = async (owner, repo) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching code frequency data", error);
    throw error;
  }
};

// util.js 또는 유사한 파일에 포함될 수 있습니다.

export const fetchWeeklyData = async (owner, repo, contributors) => {
  const weeklyData = {};

  const promises = contributors.map(async (contributor) => {
    const commits = await fetchCommitStats(owner, repo, contributor.login);

    // Fetch detailed stats for each commit
    const commitStatsPromises = commits.map(async (commitItem) => {
      const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commitItem.sha}`;
      const response = await axiosInstance.get(commitUrl);
      return response.data; // This will now include the 'stats' property
    });

    const commitsWithStats = await Promise.all(commitStatsPromises);

    commitsWithStats.forEach((commit) => {
      const weekStart = new Date(commit.commit.author.date);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const week = weekStart
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, " ");

      weeklyData[week] = weeklyData[week] || {};
      weeklyData[week][contributor.login] =
        (weeklyData[week][contributor.login] || 0) +
        (commit.stats?.additions || 0) -
        (commit.stats?.deletions || 0);
    });
  });

  await Promise.all(promises);

  return weeklyData;
};

export const prepareWeeklyGraphData = (weeklyData, contributors) => {
  // Sort dates correctly (considering both string and Date keys)
  const weeklyLabels = Object.keys(weeklyData).sort((a, b) => {
    const dateA = new Date(a.replace(/\./g, " "));
    const dateB = new Date(b.replace(/\./g, " "));
    return dateA - dateB;
  });

  const weeklyDatasets = contributors.map((contributor) => {
    return {
      label: contributor.login,
      data: weeklyLabels.map((week) => {
        const value = weeklyData[week]?.[contributor.login] || 0;
        return Math.max(value, 0); // Ensure values are at least 0
      }),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    };
  });

  return { labels: weeklyLabels, datasets: weeklyDatasets };
};

export const loadAndPrepareGraphData = async (
  fetchWeeklyData, // Pass the fetchWeeklyData function
  owner,
  repo,
  contributors
) => {
  try {
    const weeklyData = await fetchWeeklyData(owner, repo, contributors); // Pass contributors
    const weeklyGraphData = prepareWeeklyGraphData(weeklyData, contributors);
    return weeklyGraphData; // Return the prepared graph data
  } catch (error) {
    console.error("Error loading or preparing the graph data:", error);
    throw error; // Rethrow the error to handle it in your component
  }
};
