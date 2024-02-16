import React, { useState, useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { chatInfoState } from "./../recoil/recoil";
import io from "socket.io-client";
import queryString from "query-string";
import * as C from "./Chat.style.js";
import InfoBar from "../components/infoBar/InfoBar";
import Messages from "../components/messages/Messages";
import Input from "../components/input/Input";

const ENDPOINT = "https://dev.brushwork.shop/";

let socket;

const Chat = ({ location }) => {

  // const [chatInfo] = useRecoilState(chatInfoState);

  const [room] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const res = {
    roomId: 1,
    roomStatus: 1,
    buyerId: 1,
    buyerNickname: "test1",
    buyerProfile: "imgUrl1",
    sellerId: 2,
    sellerNickname: "test2",
    sellerProfile: "imgUrl2",
    productId: 1,
    productName: "product1",
    productStatus: 0,
    productPrice: 3000,
    productImg: "pImg1",
  };

  useEffect(() => {
    const { roomID } = queryString.parse(window.location.search);

    socket = io(ENDPOINT, {
      withCredentials: false,
    });

    socket.emit("connect-room", { roomId: roomID }, (error) => {

      if (error) {
        alert(error);
      }
    });
    socket.on("connect-info", (info) => {
      console.log("ci", info);
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    console.log(messages);

  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // console.log(message)
      // axios -> post 메시지 저장 api 요청
      socket.emit(
        "send-message",
        { roomId: 1, senderId: 1, receiverId: 2, content: message },
        () => setMessage("")
      );

    }
  };

  return (
    <C.OuterContainer>
      <C.Container>
        <InfoBar room={room} />
        <Messages messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </C.Container>
    </C.OuterContainer>
  );
};

export default Chat;
