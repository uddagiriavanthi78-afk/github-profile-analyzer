const axios = require("axios");

const getGithubProfile = async (username) => {
  const userRes = await axios.get(`https://api.github.com/users/${username}`);
  return userRes.data;
};

const getGithubRepos = async (username) => {
  const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);
  return repoRes.data;
};

module.exports = { getGithubProfile, getGithubRepos };