import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../state";
import axios from "axios";

const Card = (props) => {
  const { id, posterUrl, title } = props;
  const [isHovering, setIsHovering] = useState(false);

  const user = useRecoilValue(userState);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleGetProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `/api/profile?userId=${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("프로필 얻기 에러:", error);
    }
  };

  const handleAddFavoriteList = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `/api/profile/favoritelist?userId=${user._id}`,
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("찜 추가 완료");
      }
    } catch (error) {
      console.error("찜한 목록 추가 에러:", error);
    }
  };

  const handleDeleteFavoriteList = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `/api/profile/favoritelist/${id}/?userId=${user._id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("찜 제거 완료");
      }
    } catch (error) {
      console.error("찜한 목록 제거 에러: ", error);
    }
  };

  return (
    <li>
      <CardContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isHovering={isHovering}
      >
        <ImgBox src={posterUrl} alt={title} isHovering={isHovering} />
        {isHovering && (
          <>
            <HoverOverlay>
              <HoverContent>
                <HoverText>더 많은 정보</HoverText>
                <HoverIcons>
                  <Icon onClick={handleAddFavoriteList}>✚</Icon>
                  <Icon onClick={handleDeleteFavoriteList}>❌</Icon>
                  <Icon onClick={handleGetProfile}>🤷‍♂️</Icon>
                </HoverIcons>
              </HoverContent>
            </HoverOverlay>
          </>
        )}
      </CardContainer>
    </li>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 280px;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: transform 0.35s;

  ${({ isHovering }) =>
    isHovering &&
    `
    transform: scale(1.5);
  `}
`;

const ImgBox = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  ${({ isHovering }) =>
    isHovering &&
    `
    transform: scale(0.67);
  `}
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  opacity: 0.9;
  z-index: 1;
`;

const HoverContent = styled.div`
  text-align: center;
`;

const HoverText = styled.p`
  margin-bottom: 10px;
`;

const HoverIcons = styled.div`
  display: flex;
  justify-content: center;
`;

const Icon = styled.button`
  font-size: 24px;
  margin: 0 5px;
`;
