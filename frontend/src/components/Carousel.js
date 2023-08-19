import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Card from "./Card";
import UseInterval from "./UseInterval";

const Carousel = (props) => {
  const { title, movies } = props;

  const [cards, setCards] = useState(movies);
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardWidth = 200;

  useEffect(() => {
    const extendedCards = [...movies, ...movies, ...movies, ...movies];
    setCards(extendedCards);
  }, [movies]);

  const showHiddenHeader = () => {
    setHiddenStatus(true);
  };

  const hideHiddenHeader = () => {
    setHiddenStatus(false);
  };

  const handleLeftArrowClick = () => {
    if (offset === 0) {
      return;
    }

    if (!isAnimating) {
      setIsAnimating(true);
      setOffset((prev) => prev + cardWidth);
    }
  };

  const handleRightArrowClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setOffset((prev) => prev - cardWidth);
    }
  };

  const handleAnimating = () => {
    if (isAnimating) {
      setIsAnimating(false);
    }
  };

  UseInterval(handleAnimating, 700);

  return (
    <>
      <Container>
        <HeaderContainer
          onMouseEnter={showHiddenHeader}
          onMouseLeave={hideHiddenHeader}
        >
          <Header>{title} </Header>
          <HiddenHeader hiddenStatus={hiddenStatus}>
            모두 보기 &#62;
          </HiddenHeader>
        </HeaderContainer>
        <Slider>
          <LeftArrow onClick={handleLeftArrowClick}>&#60;</LeftArrow>
          <CardWrapper curXoffset={offset}>
            {cards.map((movie, index) => {
              return (
                <Card
                  key={index}
                  id={movie.id}
                  posterUrl={movie.posterUrl}
                  title={movie.title}
                />
              );
            })}
          </CardWrapper>
          <RightArrow onClick={handleRightArrowClick}>&#62;</RightArrow>
        </Slider>
      </Container>
    </>
  );
};

export default Carousel;

const fadein = keyframes`
  from { 
   opacity: 0%;
  }
  to {
    opacity: 100%;
  }
  `;

const Container = styled.div`
  padding: 30px 0px;
  background-color: #141414;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  position: relative;
`;

const CardWrapper = styled.ul`
  display: flex;
  z-index: 0;
  /* margin-left: 25px; */
  margin-right: 25px;
  transform: translateX(${(props) => props.curXoffset}px);
  transition: all 0.7s ease-in-out;
`;
const HeaderContainer = styled.div`
  margin-bottom: 15px;
  margin-left: 50px;
  color: #e5e5e5;
`;

const Header = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const HiddenHeader = styled.span`
  font-size: 12px;
  font-weight: 600;
  display: ${(props) => (props.hiddenStatus ? "inline-block" : "none")};
  animation: ${fadein} 0.3s;
`;

const Arrow = styled.button`
  position: absolute;
  top: 100px;
  direction: ${(props) => props.direction};
  color: white;
  opacity: 0.5;
  font-size: 60px;
  cursor: pointer;
  z-index: 1;
  border: none;

  background-color: #000000;

  &:hover {
    opacity: 1;
  }
`;

const LeftArrow = styled(Arrow.withComponent("button"))`
  left: 0px;
`;

const RightArrow = styled(Arrow.withComponent("button"))`
  right: 0px;
`;
