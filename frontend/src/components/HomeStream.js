import React from "react";
import styled from "styled-components";

import { InfoOutlined, PlayArrow } from "@mui/icons-material";

import netflixBackground from "../assets/netflixBackground.png";

const HomeStream = (props) => {
  //TODO
  // const { movie } = props;

  return (
    <MainContainer>
      <MainImage src={netflixBackground} />
      <MainInfo>
        <Title>{"Netflix clone coding"}</Title>
        <Description>{"Netflix clone coding"}</Description>
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

export default HomeStream;

const MainContainer = styled.div`
  height: 80vh;
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
