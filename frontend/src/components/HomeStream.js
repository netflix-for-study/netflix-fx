import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UseInterval from "./UseInterval";
import Streaming from "./Streaming";

import netflix from "../assets/netflix.png";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";

const HomeStream = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [movie, setMovie] = useState({
    name: "Star wars",
    description: "star wars description",
  });

  //* fetch the movie
  const handleMovieFetch = (movie) => {
    setMovie(movie);
  };

  //* turn on the movie
  const handleDisplayOn = () => {
    if (!isDisplay) {
      setIsDisplay(true);
    }
  };

  //* turn off the movie
  const handleDisplayOff = () => {
    if (isDisplay) {
      setIsDisplay(false);
    }
  };

  //* turn on every 5000ms
  UseInterval(handleDisplayOn, 5000);

  useEffect(() => {
    //TODO : fetch the movie
    //* use handleMovieFetch
  }, []);

  return (
    <MainContainer>
      <MainImage src={netflix} />
      {/* {isDisplay ? <Streaming /> : <MainImage src={netflix} />} */}
      <MainInfo>
        <Title isDisplay={isDisplay}>{movie.name}</Title>
        <Description isDisplay={isDisplay}>{movie.description}</Description>
        <ButtonContainer>
          <PlayButtonContainer>
            <PlayArrow />
            <Play>Play</Play>
          </PlayButtonContainer>
          <InfoButtonContainer>
            <InfoOutlined />
            <Info>More Info</Info>
          </InfoButtonContainer>
        </ButtonContainer>
      </MainInfo>
    </MainContainer>
  );
};

export default React.memo(HomeStream);

const MainContainer = styled.div`
  height: 90vh;
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  position: absolute;
  left: 50px;
  bottom: 150px;
  color: #f2f2f2;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

const Description = styled.div`
  margin: 18px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const PlayButtonContainer = styled.button`
  display: flex;
  align-items: center;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 600;
  background-color: #f2f2f2;
`;

const InfoButtonContainer = styled.button`
  display: flex;
  align-items: center;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 600;
  background-color: #cecece;
`;

const Play = styled.span`
  margin-left: 4px;
`;

const Info = styled.span`
  margin-left: 4px;
`;
