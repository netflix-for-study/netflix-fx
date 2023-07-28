import React from "react";
import styled from "styled-components";

import netflixlogo from "../assets/logo.jpg";
import profilelogo from "../assets/profile.jpg";
import Profile from "../components/Profile";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const profiles = [
    {
      name: "haejunejung",
      logo: profilelogo,
      link: "",
    },
    {
      name: "haejunejung",
      logo: profilelogo,
      link: "",
    },
    {
      name: "haejunejung",
      logo: profilelogo,
      link: "",
    },
    {
      name: "haejunejung",
      logo: profilelogo,
      link: "",
    },
  ];

  return (
    <Background>
      <NetflixLogo src={netflixlogo} />
      <Profiles>
        <Title>프로필을 선택하세요</Title>
        {profiles.map((profile, index) => {
          return <Profile key={index} profile={profile} />;
        })}
        <ManagementButton>
          <Link to="/home">프로필 관리</Link>
        </ManagementButton>
      </Profiles>
    </Background>
  );
};

export default ProfilePage;

const Background = styled.div`
  background-color: #0b0b0b;
  width: 100vw;
  height: 100vh;

  color: #f2f2f2;
`;

const NetflixLogo = styled.img`
  padding: 10px 45px;
  height: 45px;
  margin-right: 40px;
`;

const Profiles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  margin-left: 25px;
`;

const ManagementButton = styled.button`
  width: 120px;
  height: 30px;
  text-align: center;
  padding: 5px;
  border: 1px solid white;

  margin-left: 40%;
`;
