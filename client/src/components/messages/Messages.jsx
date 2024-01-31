import React, { useEffect } from "react";
import styled from "styled-components";
import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./message/Message";

const ScrollToBottom = styled(BasicScrollToBottom)`
  overflow: auto;
  flex: auto;
`;
const Wrapper = styled.div`
  padding: 1rem;
`;

function Messages({ messages, name }) {
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <ScrollToBottom>
      <Wrapper>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <Message message={message} name={name} />
            </div>
          );
        })}
      </Wrapper>
    </ScrollToBottom>
  );
}

export default Messages;
