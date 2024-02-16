import React from "react";
import * as M from "./Message.style.js";
import ReactEmoji from "react-emoji";

const userId = 1; // 로그인 시 recoil에 회원정보 저장해서 사용

function Message({ message: { content, isMedia, senderId, createdAt } }) {
  const createdAtDate = new Date(createdAt);

  // 시간 정보 추출
  const hours = createdAtDate.getHours();
  const minutes = createdAtDate.getMinutes();

  // 오전/오후 구분
  const meridiem = hours >= 12 ? "오후" : "오전";

  // 12시간 형식으로 변환
  const hours12 = hours % 12 || 12; // 0시일 경우 12로 표시

  // 최종 형식 설정
  const formattedTime = `${meridiem} ${hours12}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  let isSentByCurrentUser = false;

  if (senderId === userId) {
    isSentByCurrentUser = true;
  }

  return (
    <>
      {isSentByCurrentUser ? (
        <M.MessageWrapper right>
          <M.Time>{formattedTime}</M.Time>
          <M.MessageBox right>{ReactEmoji.emojify(content)}</M.MessageBox>
        </M.MessageWrapper>
      ) : (
        <M.MessageWrapper>
          <M.MessageBox>{ReactEmoji.emojify(content)}</M.MessageBox>
          <M.Time>{formattedTime}</M.Time>
        </M.MessageWrapper>
      )}
    </>
  );
}

export default Message;
