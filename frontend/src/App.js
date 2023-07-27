import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleFetch } from "./utils/functions";
import { API_PATHS } from "./utils/constants";
import Movie from "./components/Movie";

/**
 * adult
 * backdrop_path
 * genre_ids (Array)
 * original_language
 * original_title
 * overview
 * popularity
 * poster_path
 * release_date
 * title
 * video : boolean
 * vote_average
 * vote_count
 */

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    handleFetch(API_PATHS.MOVIES, (data) => {
      setMovies(data);
      setLoading(false);

      console.log(data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
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
      )}
    </div>
  );
};

export default App;
