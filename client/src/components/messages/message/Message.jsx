import React from "react";

import * as M from "./Message.style.js";
import ReactEmoji from "react-emoji";

function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <>
      {isSentByCurrentUser ? (
        <M.MessageWrapper right>
          <M.Time>오후 4:31</M.Time>
          <M.MessageBox right>{ReactEmoji.emojify(text)}</M.MessageBox>
        </M.MessageWrapper>
      ) : (
        <M.MessageWrapper>
          <M.MessageBox>{ReactEmoji.emojify(text)}</M.MessageBox>
          <M.Time>오후 4:31</M.Time>
        </M.MessageWrapper>
      )}
    </>
  );
}

export default Message;
