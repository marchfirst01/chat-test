"use strict" //오류 줄이기
const socket = io(); //클라이언트 소켓이 담기게 됨

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click",()=>{
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param) //채널이름
})

socket.on("chatting", (data)=>{ //여기 안에 서버에서 말한거 담김
    const li = document.createElement("li"); //화면 그려주기 
    li.innerText = `${data.name}님이 - ${data.msg}`;
    console.log(data)
    chatList.appendChild(li) //ul안에 li자식으로 넣어준다.
})//서버에서 말하는거 받아줄때
console.log(socket)