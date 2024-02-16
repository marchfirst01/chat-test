import React from "react";
import * as C from "./ChatList.style";

export default function ChatList() {
  return (
    <C.Wrapper>
      <C.ProfileImg />
      <C.MessageWrapper>
        <C.Content>
          <C.Name>작가명</C.Name>
          <C.Time>35분전</C.Time>
        </C.Content>
        <C.LastMessage>사진을 보냈습니다.</C.LastMessage>
      </C.MessageWrapper>
    </C.Wrapper>
  );
}
