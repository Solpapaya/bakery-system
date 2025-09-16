import React from "react";
import styled from "styled-components";
import SadCinnamonRoll from "../assets/sad_cinnamon_roll.svg?react";
import NeutralBagel from "../assets/neutral_bagel.svg?react";
import { MessageTypes } from "../constants/messageTypes";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const StyledSvg = styled.div`
  & svg {
    width: 15rem;
    height: 15rem;
  }
`;

const Message = styled.div`
  color: var(--color-gray-600);
  font-weight: 500;
  text-align: center;
`;

function MessageSvg({ type, message }) {
  return (
    <Wrapper>
      <StyledSvg>
        {type === MessageTypes.NOT_FOUND && <SadCinnamonRoll />}
        {type === MessageTypes.NEUTRAL && <NeutralBagel />}
      </StyledSvg>
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default MessageSvg;
