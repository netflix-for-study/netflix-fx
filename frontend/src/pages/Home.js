import React, { useEffect, useState } from "react";
import axios from "axios";

import Navigation from "../components/Navigation";
import HomeStream from "../components/HomeStream";
import Carousel from "../components/Carousel";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get("/api/movies");

      if (response.status === 200) {
        setMovies(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("영화 불러오기 오류: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  //TODO urls
  const SLIDES = [
    {
      id: 1,
      title: "지금 뜨는 콘텐츠",
      movies: movies.slice(0, 8),
    },
    {
      id: 2,
      title: "어드벤쳐 드라마 & 영화",
      movies: movies.slice(4, 12),
    },
    {
      id: 3,
      title: "액션 드라마 & 영화",
      movies: movies.slice(8, 16),
    },
    {
      id: 4,
      title: "코메디 드라마 & 영화",
      movies: movies.slice(12, 20),
    },
  ];

  return (
    <>
      <Navigation />
      <HomeStream movie={movies[0]} />
      {!loading &&
        SLIDES.map((slide, idx) => {
          return (
            <Carousel
              key={slide.id}
              title={slide.title}
              movies={slide.movies}
            />
          );
        })}
    </>
  );
};

export default Home;
