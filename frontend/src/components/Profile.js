import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { name, logo, link } = props.profile;
  return (
    <Container>
      <ProfileCard>
        <Logo src={logo} />
        <Name>{name}</Name>
      </ProfileCard>
    </Container>
  );
};

export default Profile;

const Container = styled.li`
  float: left;
  list-style: none;
  margin: 10px;
  display: block;
`;

const ProfileCard = styled.div`
  width: 150px;
  height: 200px;
  background: transparent;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

const Name = styled.div`
  text-align: center;
`;
