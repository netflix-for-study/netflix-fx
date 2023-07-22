const express = require("express");
const {
  fetchPopularMovies,
  fetchMovieDetails,
} = require("../services/tmdbService");

const router = express.Router();

//인기 영화목록 조회
router.get("/", async (req, res) => {
  try {
    const movies = await fetchPopularMovies();
    res.json(movies);
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
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("특정 영화 정보 조회 실패");
  }
});

module.exports = router;
