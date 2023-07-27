import React from "react";
import styled from "styled-components";

const InputItem = (props) => {
  const { data } = props;
  const { name, title, type, validation, alert, getter, setter } = data;

  return (
    <ItemContainer>
      <Title>{title}</Title>
      <PlaceHolder
        name={name}
        type={type}
        onChange={(e) => setter(e.target.value)}
      />
      {!validation && getter.length > 0 && <InputAlert>{alert}</InputAlert>}
    </ItemContainer>
  );
};

export default InputItem;

const ItemContainer = styled.div`
  display: block;
  width: 440px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0;
  background-color: #333333;
  border-radius: 5px;
  text-align: left;

  &:hover {
    background-color: #444444;
    border-bottom: 1px solid orange;
  }
`;

const Title = styled.span`
  color: #f2f5f5;
  font-weight: 700;
`;

const PlaceHolder = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: #f2f5f5;
  border: none;
  background-color: transparent;
`;

const InputAlert = styled.div`
  color: orange;
  font-weight: bold;
`;
