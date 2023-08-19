import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import profile from "../assets/profile.jpg";
import netflixLogo from "../assets/netflixLogo.jpg";
import { userState } from "../state";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  //TODO : 프로필 불러오기 (임시 프로필로 만들어둠)
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleAddProfile = () => {
    console.log("Add profile");
  };

  const handleManageProfile = () => {
    console.log("Manage profile");
  };

  console.log(user);

  return (
    <Background>
      <NavBar>
        <NetflixLogo src={netflixLogo} />
      </NavBar>
      <ProfileContainer>
        <Title>넷플릭스를 시청할 프로필을 선택하세요</Title>
        <Profiles>
          <ProfileInfo>
            <ProfileImage
              src={profile}
              onClick={() => {
                navigate("/home");
              }}
            />
            <ProfileName>{user.username}</ProfileName>
          </ProfileInfo>
          <ProfileInfo>
            <ProfileAdd onClick={handleAddProfile}>
              <AddCircleIcon />
            </ProfileAdd>
            <ProfileName>프로필 추가</ProfileName>
          </ProfileInfo>
        </Profiles>
        <ProfileManage onClick={handleManageProfile}>프로필 관리</ProfileManage>
      </ProfileContainer>
    </Background>
  );
};

export default Profile;

//* styled-components
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #141414;
  overflow: hidden;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 5px 45px; */
`;

const NetflixLogo = styled.img`
  position: absolute;
  left: 45px;
  top: 10px;
  width: 120px;
  height: 60px;
`;

const ProfileContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;

  margin-bottom: 100px;
`;

const Title = styled.h2`
  font-size: 3rem;
  letter-spacing: 0.2rem;
  font-size: 600;
`;

const Profiles = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #fff;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 10vw;
  min-height: 8.4rem;
  max-height: 20rem;
  width: 10vw;
  min-width: 8.4px;
  max-width: 20rem;
  border-radius: 0.4rem;
  border: none;
  outline: none;
  margin-top: 4rem;
  margin-right: 3.5rem;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ProfileName = styled.h2`
  color: white;
  margin-right: 3.5rem;
`;

const ProfileAdd = styled.button`
  height: 10vw;
  min-height: 8.4rem;
  max-height: 20rem;
  width: 10vw;
  min-width: 8.4px;
  max-width: 20rem;
  border-radius: 0.4rem;
  border: none;
  outline: none;
  margin-top: 4rem;
  margin-right: 3.5rem;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ProfileManage = styled.button`
  position: absolute;
  top: 60%;
  left: 48%;
  transform: translate(-50%, -50%);

  border: 1px solid grey;
  color: grey;
  text-transform: uppercase;
  padding: 0.8rem 2.6rem;
  letter-spacing: 0.5rem;
  font-size: 2.5rem;
  margin-top: 12rem;
  background-color: transparent;
  cursor: pointer;

  :hover {
    border: 1px solid #fff;
    color: #fff;
  }
`;
