import React, { useEffect, useState } from "react";
import axios from "axios";

import Navigation from "../components/Navigation";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import Card from "../components/Card";
import styled from "styled-components";

const MyLists = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [movies, setMovies] = useState([]);

  const user = useRecoilValue(userState);

  useEffect(() => {
    const handleGetFavoriteLists = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `/api/profile/favoritelist/?userId=${user._id}`,
          {},
          {
            header: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // alert("찜한 목록 조회 완료");

          setFavoriteLists(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("찜한 영화목록 조회 에러:", error);
      }
    };

    handleGetFavoriteLists();
  }, [user]);

  const getMovies = async () => {
    try {
      const response = await axios.get("/api/movies");

      if (response.status === 200) {
        setMovies(response.data);
        setLoading(false);

        console.log(response.data);
      }
    } catch (error) {
      console.log("영화 불러오기 오류: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <Navigation />
      <CardContainer>
        {!loading &&
          movies
            .filter((movie) => favoriteLists.includes(movie.id)) // favoriteLists에 포함된 영화들만 필터링
            .map((movie, idx) => (
              <Card
                key={idx}
                id={movie.id}
                posterUrl={movie.posterUrl}
                title={movie.title}
              />
            ))}
      </CardContainer>
    </Container>
  );
};

export default MyLists;

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 10vh 0px;
  background-color: #141414;
  overflow: hidden;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* 각 열의 최소 너비는 200px, 하나의 열은 1fr만큼 차지 */
  gap: 15px; /* 카드 사이 간격 */
  padding: 20px; /* 좌우 여백 추가 */
  overflow: hidden; /* 넘치는 부분 숨기기 */
`;
