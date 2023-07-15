const axios = require("axios");
const config = require("config");

//TMDB API 연결
//인기영화 목록
const fetchPopularMovies = async () => {
  try {
    const { data } = await axios.get(
      `${config.get("TMDB_API_BASE_URL")}/movie/popular`,
      {
        params: {
          api_key: config.get("TMDB_API_KEY"),
        },
      }
    );
    return data.results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch popular movies");
  }
};

//영화 상세정보 목록
const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(
      `${config.get("TMDB_API_BASE_URL")}/movie/${movieId}`,
      {
        params: {
          api_key: config.get("TMDB_API_KEY"),
        },
      }
    );
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch movie details");
  }
};

module.exports = {
  fetchPopularMovies,
  fetchMovieDetails,
};
