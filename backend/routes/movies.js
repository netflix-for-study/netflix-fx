const express = require("express");
const router = express.Router();
const {
  fetchPopularMovies,
  fetchMovieDetails,
  getImageUrl,
} = require("../services/tmdbService");

//인기 영화목록 조회
router.get("/", async (req, res) => {
  try {
    const movies = await fetchPopularMovies();
    const moviesData = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    res.json(moviesData);
  } catch (err) {
    console.error(err);
    res.status(500).send("영화목록 조회 실패");
  }
});

//특정 영화 정보 조회
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await fetchMovieDetails(movieId);
    const movieData = movie.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    res.json(movieData);
  } catch (err) {
    console.error(err);
    res.status(500).send("특정 영화 정보 조회 실패");
  }
});

module.exports = router;
