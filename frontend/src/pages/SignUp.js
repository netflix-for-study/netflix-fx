import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import bannerLogo from "../assets/logo.jpg";
import InputItem from "../components/InputItem";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //* 특수 문자
  const specialChars = /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;

  //* 이름 유효성 검사
  const isNameValidation = name.length >= 2 && !specialChars.test(name);

  //* 이메일 유효성 검사
  const isEmailValidation = email.length !== 0 && email.includes("@");

  //* 비밀번호 유효성 검사
  const isPasswordValidation =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  //* 유효성 검사
  const isValidation =
    isNameValidation && isEmailValidation && isPasswordValidation;

  const user = [
    {
      name: name,
      title: "Name",
      type: "text",
      validation: isNameValidation,
      alert: "정확한 이름으로 입력해주세요.",
      getter: name,
      setter: setName,
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

  //* sign up button handler
  const handleSignUpButton = () => {
    //TODO
    navigate("/");
  };

  return (
    <Background>
      <NavBar>
        <NetflixLogo src={bannerLogo} />
      </NavBar>
      <SignUpContainer>
        <Title>Sign Up</Title>
        {user.map((data, idx) => {
          return <InputItem key={data} data={data} />;
        })}
        <Button
          disabled={!isValidation}
          onClick={handleSignUpButton}
          backgroundColor={"red"}
        >
          Sign Up
        </Button>
        <Help>Help?</Help>
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

const Button = styled.button`
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
`;

const Help = styled.div`
  height: 20px;
  margin: 10px 0;
  color: #939393;
  text-decoration: none;
  text-align: right;
`;
