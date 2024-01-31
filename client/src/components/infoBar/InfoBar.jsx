import React from "react";
import * as I from "./InfoBar.style.js";
import { AiOutlineArrowLeft, AiOutlineAlert } from "react-icons/ai";
import { Link } from "react-router-dom";

function InfoBar() {
  return (
    <I.Wrapper>
      <I.Container>
        <Link href="/">
          <AiOutlineArrowLeft size={16} />
        </Link>
        <I.Name>작가명</I.Name>
      </I.Container>
      <I.Container>
        <AiOutlineAlert size={24} />
      </I.Container>
    </I.Wrapper>
  );
}

export default InfoBar;
