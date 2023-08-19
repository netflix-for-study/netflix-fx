import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import netflixLogo from "../assets/netflixLogo.jpg";
import InputItem from "../components/InputItem";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //TODO
  const isUsernameValidation = true;
  const isEmailValidation = true;
  const isPasswordValidation = true;
  const isValidation = true;

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        alert("가입이 완료되었습니다. 로그인 창으로 이동합니다.");
        navigate("/");
      }

      if (response.status === 400) {
        alert("이미 가입된 회원입니다.");

        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const inputs = [
    {
      name: username,
      title: "Username",
      type: "string",
      validation: isUsernameValidation,
      alert: "정확한 이름을 입력해주세요.",
      getter: username,
      setter: setUsername,
    },
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

  return (
    <Background>
      <NavBar>
        <NetflixLogo src={netflixLogo} />
      </NavBar>
      <SignUpContainer>
        <Title>회원가입</Title>
        {inputs.map((data, index) => {
          return <InputItem key={index} data={data} />;
        })}
        <SignInButton disabled={!isValidation} onClick={handleSignUp}>
          회원가입
        </SignInButton>
      </SignUpContainer>
    </Background>
  );
};

export default SignUp;

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

const SignUpContainer = styled.div`
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
