import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { chatInfoState, userState } from "./../recoil/recoil";

const res = {
  isSuccess: true,
  code: 2000,
  message: "success!",
  result: {
    roomId: 2,
    roomName: "4bb7b3581490d0d09c97f006295db664",
    roomStatus: 1,
    buyerId: 3,
    sellerId: 2,
    productId: 1,
    latestMsg: "",
    latestMsgData: "2024-02-01 02:49:49",
    createdAt: "2024-02-01 02:49:49",
    isAlreadyExist: 1,
  },
};

export default function Join() {
  const navigate = useNavigate();
  const [, setResResult] = useRecoilState(chatInfoState);
  const [, setUser] = useRecoilState(userState);

  const clickButton = () => {
    setUser(Math.floor(Math.random() * 1000 + 1));
    setResResult(res.result);
    navigate(`/chat?roomID=${res.result.roomId}`);
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
