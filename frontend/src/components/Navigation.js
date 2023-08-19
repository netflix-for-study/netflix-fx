import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import netflixLogo from "../assets/netflixLogo.jpg";
import profilelogo from "../assets/profile.jpg";
import {
  ArrowDropDown,
  CardGiftcard,
  Notifications,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScroll, setIsScroll] = useState(false);
  const navigate = useNavigate();

  const MENUS = [
    {
      title: "Home",
      navigate: "/home",
    },
    {
      title: "Tv Shows",
      navigate: "/TvShows",
    },
    {
      title: "Movies",
      navigate: "/movies",
    },
    {
      title: "Latest",
      navigate: "/latest",
    },
    {
      title: "My Lists",
      navigate: "/MyLists",
    },
  ];

  const PROFILE_LINKS = ["settings", "logout"];

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavBar isScroll={isScroll}>
      <Container>
        <LeftItems>
          <NetflixLogo src={netflixLogo} />
          {MENUS.map((value, index) => {
            return (
              <Item
                key={index}
                onClick={() => {
                  navigate(value.navigate);
                }}
              >
                {value.title}
              </Item>
            );
          })}
        </LeftItems>
        <RightItems>
          <Search style={{ marginRight: "10px" }} />
          <CardGiftcard style={{ marginRight: "10px" }} />
          <Notifications style={{ marginRight: "10px" }} />
          <Profile src={profilelogo} />
          <ProfileDropdown>
            <ArrowDropDown />
            <Links>
              {PROFILE_LINKS.map((link, index) => {
                return <LinkItem key={index}>{link}</LinkItem>;
              })}
            </Links>
          </ProfileDropdown>
        </RightItems>
      </Container>
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.section`
  color: #f2f2f2;
  font-size: 14px;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  transition: all 400ms ease-out;
  background: linear-gradient(to top, trasparent 0%, rgb(0, 0, 0, 0.2) 50%);

  ${(props) =>
    props.isScroll &&
    css`
      background-color: #0b0b0b;
      transition: all 400ms ease-in;
    `}
`;

const Container = styled.div`
  padding: 10px 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
`;

const NetflixLogo = styled.img`
  height: 45px;
  margin-right: 40px;
`;

const Item = styled.span`
  margin-right: 18px;
  cursor: pointer;
`;

const RightItems = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  margin-right: 10px;
`;

const Profile = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;

  margin-right: 10px;
`;

const ProfileDropdown = styled.div`
  cursor: pointer;
`;

const Links = styled.div`
  display: none;

  ${ProfileDropdown}:hover & {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: var(--main-color);
  }
`;

const LinkItem = styled.span`
  padding: 8px;
  cursor: pointer;
`;
