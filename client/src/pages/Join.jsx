import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postCreateRoom } from "../apis/createRoom.js";

const data = {
  buyerId: 1,
  sellerId: 2,
  productId: 1,
};

const res = {
  roomId: 1,
  isAlreadyExist: 1,
};

export default function Join() {
  const navigate = useNavigate();

  const clickButton = async () => {
    try {
      const { buyerId, sellerId, productId } = data;
      const createRoomRes = await postCreateRoom({
        buyerId,
        sellerId,
        productId,
      });
      console.log(createRoomRes);
      navigate(`/chat?roomID=${res.roomId}`);
    } catch (error) {
      console.error("방생성 오류 발생", error);
    }
  };
  return (
    <Wrapper>
      <Button onClick={clickButton}>문의하기</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Button = styled.button`
  width: 174px;
  height: 44px;
  border: none;
  border-radius: 6px;
  background: var(
    --Gradation_dark,
    linear-gradient(225deg, #8c4ff2 0%, #4812a3 100%)
  );
  color: #fff;
  cursor: pointer;
`;
