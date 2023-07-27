import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const { poster_path, title, overview, genre_ids } = props;

  console.log(poster_path, title, overview, genre_ids);
  return (
    <li>
      <ImgBox
        src={"https://image.tmdb.org/t/p/w200" + poster_path}
        alt={title}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
      />
    </li>
  );
};

export default Card;

const ImgBox = styled.img`
  width: 200px;
  height: 280px;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.35s;
  }
`;
