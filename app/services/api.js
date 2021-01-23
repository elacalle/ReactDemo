const id = "0eceabb0f2524f0e8dbb"
const sec = "81a649775b0b6b55605c7cf63c85805de95d70a1"
const params = `?client_id=${id}&client_secret=${sec}`

import axios from 'axios';


function getErrorMsg(message, username) {
  if (message === 'Not found') {
    return `${username} doesn't exist`
  }

  return message;
}

async function getProfile(username) {
  try {
    const {data} = await axios.get(`https://api.github.com/users/${username}${params}`)

    return Promise.resolve(data);
  } catch(error) {
    const {message} = error;

    if(message) {
      throw new Error(getErrorMsg(repos.message, username))
    }
  }
}

async function getRepos(username) {
  try {
    const {data} = await axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)

    return Promise.resolve(data);
  } catch(error) {
    const {message} = error;

    if(message) {
      throw new Error(getErrorMsg(repos.message, username))
    }
  }
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
}

function calculateScore(followers, repos) {
  return (followers * 3) + getStarCount(repos)
}

async function getUserData(player) {
  const profile = await getProfile(player);
  const repos = await getRepos(player);

  return {
    profile,
    score: calculateScore(profile.followers, repos)
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

export async function battle(player1, player2) {
  let result = await Promise.all([
    getUserData(player1),
    getUserData(player2),
  ])

  return sortPlayers(result);
}

export async function fetchPopularRepos(language) {
  const {data} = await axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return data;
};