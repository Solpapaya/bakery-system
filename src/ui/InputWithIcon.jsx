import styled, { css } from "styled-components";
import { mqWidth } from "../utils/mediaQueryHelpers";

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.$width};
  left: 0;
  height: 3.2rem;

  & svg {
    position: absolute;
    top: 50%;
    transform: translateY(-52%);
    stroke-width: 1.5;
    color: var(--color-brand-1000);
    /* width: 1.5rem;
    height: 1.5rem; */

    @media ${mqWidth.tablet} {
      /* width: 1.5rem;
      height: 1.5rem; */
    }

    ${(props) =>
      props.$iconPos === "left" &&
      css`
        left: 0.5rem;
        @media ${mqWidth.tablet} {
          left: 0.8rem;
        }
      `}

    ${(props) =>
      props.$iconPos === "right" &&
      css`
        right: 0.8rem;
      `}

    ${(props) =>
      props.$isSearchSetted &&
      css`
        stroke-width: 2;
      `}
  }

  & input {
    ${(props) =>
      props.$isSearchSetted &&
      css`
        background-color: var(--color-gray-300);
        color: var(--color-gray-700);
        font-weight: 500;
      `}
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-md);
  outline: 1.2px solid var(--color-gray-300);
  border: none;
  padding: 0.4rem 0.8rem;
  /* font-size: 1.3rem; */
  font-size: 1.6rem;
  color: var(--color-gray-900);
  background-color: var(--color-gray-0);
  text-align: left;
  /* font-weight: 500; */
  padding-left: 2.6rem;
  padding-right: 4rem; // need to be equal to the width of the clear button

  @media ${mqWidth.tablet} {
    font-size: 1.4rem;
  }

  &::placeholder {
    color: var(--color-gray-500);
  }

  &:focus,
  &:hover {
    outline: 1px solid var(--color-brand-600);
  }
`;

function InputWithIcon({
  width = "13rem",
  isSearchSetted = false,
  icon,
  iconPos = "left",
  ...props
}) {
  return (
    <Wrapper $width={width} $iconPos={iconPos} $isSearchSetted={isSearchSetted}>
      <Input $iconPos={iconPos} {...props} />
      {icon}
    </Wrapper>
  );
}

export default InputWithIcon;
