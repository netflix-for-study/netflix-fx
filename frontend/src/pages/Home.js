import React, { useEffect, useState } from "react";

import { handleFetch } from "../utils/functions";
import { API_PATHS } from "../utils/constants";
import Carousel from "../components/Carousel";
import HomeStream from "../components/HomeStream";
import Navigation from "../components/Navigation";
import Movie from "../components/Movie";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async (data) => {
    handleFetch(API_PATHS.MOVIES, (data) => {
      setMovies(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  //TODO urls
  const SLIDES = [
    {
      id: 1,
      title: "지금 뜨는 콘텐츠",
      movies: movies,
    },
    {
      id: 2,
      title: "어드벤쳐 드라마 & 영화",
      movies: movies,
    },
    {
      id: 3,
      title: "액션 드라마 & 영화",
      movies: movies,
    },
    {
      id: 4,
      title: "코메디 드라마 & 영화",
      movies: movies,
    },
  ];

  return (
    <>
      <Navigation />
      <HomeStream />
      {loading &&
        SLIDES.map((slide, idx) => {
          return (
            <Carousel
              key={slide.id}
              title={slide.title}
              movies={slide.movies}
            />
          );
        })}

      {/* {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
      )} */}
    </>
  );
};

export default Home;
