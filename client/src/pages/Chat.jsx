import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState, chatInfoState } from "./../recoil/recoil";
import io from "socket.io-client";
import * as C from "./Chat.style.js";
import InfoBar from "../components/infoBar/InfoBar";
import Messages from "../components/messages/Messages";
import Input from "../components/input/Input";

const ENDPOINT = "http://localhost:8080/";

let socket;

const Chat = ({ location }) => {
  const [chatInfo] = useRecoilState(chatInfoState);
  const [user] = useRecoilState(userState);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 여기선 name과 room을 url에서 가져온다.
    // 이유는 setRoom과 setName이 적용되기 전에 socket.emit('join')이 실행되기 때문이다.
    // url에서 가져오는 방법이 아닌 다른 방법으로 name과 room을 가져오려면
    // 미리 정해진 방법으로 name과 room을 가져오는 것이 아닌
    // socket.emit('join')이 실행되기 전에 setRoom과 setName이 실행되도록 해야 한다.
    socket = io(ENDPOINT);

    const newRoom = chatInfo.roomId;
    const newName = user;

    setRoom(newRoom);
    setName(newName);

    socket.emit("join", { name: newName, room: newRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      console.log("roomData", users);
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // console.log(message)
      // axios -> post 메시지 저장 api 요청
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <C.OuterContainer>
      <C.Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
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
