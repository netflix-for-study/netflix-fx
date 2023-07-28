import React from "react";

const Movie = (props) => {
  const { poster_path, title, overview, genre_ids } = props;
  return (
    <div>
      <img src={"https://image.tmdb.org/t/p/w200" + poster_path} alt={title} />
      <h2> {title} </h2>
      <p> {overview}</p>
      <ul>
        {genre_ids.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
