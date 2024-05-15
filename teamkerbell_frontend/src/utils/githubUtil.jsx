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
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  try {
    const response = await axiosInstance.get(url);
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
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`,
    {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};
