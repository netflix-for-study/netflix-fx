import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Card from "./Card";

const maximumVisibleCards = 8;

const Carousel = (props) => {
  const { title, movies } = props;

  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentId, setCurrentId] = useState(1);
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  console.log(title, movies);

  //* when we click the left arrow,
  const handleLeftArrowClick = () => {};

  //* when we click the right arrow,
  const handleRightArrowClick = () => {};

  const showHiddenHeader = () => {
    setHiddenStatus(true);
  };

  const hideHiddenHeader = () => {
    setHiddenStatus(false);
  };

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  //* update the cards,
  const updateCards = () => {
    //TODO
  };

  useEffect(() => {}, []);

  // return (
  //   <>
  //     <Container>
  //       <HeaderContainer
  //         onMouseEnter={showHiddenHeader}
  //         onMouseLeave={hideHiddenHeader}
  //       >
  //         <Header>{props.title} </Header>
  //         <HiddenHeader hiddenStatus={hiddenStatus}>
  //           모두 보기 &#62;
  //         </HiddenHeader>
  //       </HeaderContainer>
  //       <Slider>
  //         {cards.length > maximumVisibleCards && (
  //           <LeftArrow onClick={handleLeftArrowClick}>&#60;</LeftArrow>
  //         )}
  //         <CardWrapper curXoffset={offset}>
  //           {movies.map((movie, index) => {
  //             return (
  //               <Card
  //                 key={movie.id}
  //                 poster_path={movie.poster_path}
  //                 title={movie.title}
  //                 overview={movie.overview}
  //                 genre_ids={movie.genre_ids}
  //                 onClick={handleModal}
  //               />
  //             );
  //           })}
  //         </CardWrapper>
  //         {cards.length > maximumVisibleCards && (
  //           <RightArrow onClick={handleRightArrowClick}>&#62;</RightArrow>
  //         )}
  //       </Slider>
  //       {/* <ModalPortal>
  //         {modalOn && <Modal onClose={handleModal} currentId={currentId} />}
  //       </ModalPortal> */}
  //     </Container>
  //   </>
  // );
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
  margin-left: 25px;
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
  color: #e5e5e5;
  opacity: 0.5;
  font-size: 60px;
  cursor: pointer;
  z-index: 1;

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
