import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import netflixLogo from "../assets/netflixLogo.jpg";
import InputItem from "../components/InputItem";
import { useSetRecoilState } from "recoil";
import { authTokenState, userState } from "../state";

//TODO profilePicture -> backend
//TODO Help 모달창
//TODO SignUp 창kak

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const setAuthToken = useSetRecoilState(authTokenState);
  const navigate = useNavigate();

  const isEmailValidation = true;
  const isPasswordValidation = true;
  const isValidation = true;

  // const isEmailValidation = email.length !== 0 && email.includes("@");
  // const isPasswordValidation =
  //   password.length >= 8 &&
  //   /[a-z]/.test(password) &&
  //   /[A-Z]/.test(password) &&
  //   /[0-9]/.test(password);
  // const isValidation = isEmailValidation && isPasswordValidation;

  const inputs = [
    {
      name: email,
      title: "Email",
      type: "email",
      validation: isEmailValidation,
      alert: "정확한 이메일 주소 형식으로 입력해주세요.",
      getter: email,
      setter: setEmail,
    },
    {
      name: password,
      title: "Password",
      type: "password",
      validation: isPasswordValidation,
      alert: "8자 이상 영문 대소문자, 숫자, 특수문자를 입력해주세요.",
      getter: password,
      setter: setPassword,
    },
  ];

  const handleSignInButton = () => {
    const getUsers = async () => {
      try {
        const response = await axios.post("/api/auth/login", {
          email,
          password,
        });

        if (response.status === 200) {
          const token = response.headers["auth-token"];
          localStorage.setItem("authToken", token);
          /**
           * response data - email, profilePicture, username, _id
           * TODO : profilePicture 받기! & profile 창 만들기
           */

          setUser(response.data);
          setAuthToken(token);

          navigate("/profile");
        }
      } catch (error) {
        alert("로그인 오류: ", error);
      }
    };

    getUsers();
  };

  return (
    <Background>
      <NavBar>
        <NetflixLogo src={netflixLogo} />
      </NavBar>
      <SignInContainer>
        <Title>로그인</Title>
        {inputs.map((data, index) => {
          return <InputItem key={index} data={data} />;
        })}
        <SignInButton disabled={!isValidation} onClick={handleSignInButton}>
          로그인
        </SignInButton>
        <Help>도움이 필요하신가요?</Help>
        <PlaceHolder>
          Netflix 회원이 아닌가요?
          <Link to="/signup">
            <SignUp> 지금 가입하세요.</SignUp>
          </Link>
        </PlaceHolder>
      </SignInContainer>
    </Background>
  );
};

export default SignIn;

//* styled-components
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(${process.env.PUBLIC_URL}/assets/banner.jpg);
  background-size: cover;

  overflow: hidden;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 45px;
`;

const NetflixLogo = styled.img`
  position: absolute;
  left: 45px;
  top: 10px;
  width: 120px;
  height: 60px;
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 440px;
  padding: 70px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #f2f5f5;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: xx-large;
`;

const SignInButton = styled.button`
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: ${(props) => props.backgroundColor};
  color: #f2f5f5;
  font-weight: 700;
  font-size: large;
  :focus {
    cursor: pointer;
  }
  background-color: red;
`;

const Help = styled.div`
  height: 20px;
  margin: 10px 0;
  color: #939393;
  text-decoration: none;
  text-align: right;
`;

const PlaceHolder = styled.div`
  height: 20px;
  margin: 10px 0;
  color: #939393;
  text-decoration: none;
  text-align: center;
`;

const SignUp = styled.span`
  color: white;
  font-size: large;
  text-decoration: none;
  font-weight: 700;
`;
