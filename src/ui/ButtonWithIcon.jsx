import styled, { css } from "styled-components";
import { mqHasTouchInputs, mqWidth } from "../utils/mediaQueryHelpers";

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.$width};
  left: 0;

  & svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    stroke-width: 1.5;
    color: var(--color-brand-1000);

    ${(props) =>
      props.$iconPos === "left" &&
      css`
        left: 1rem;
        /* left: 0.5rem;
        @media ${mqWidth.tablet} {
          left: 0.8rem;
        } */
      `}

    ${(props) =>
      props.$iconPos === "right" &&
      css`
        right: 0.8rem;
      `}

      ${(props) =>
      props.$placeholder &&
      css`
        stroke-width: 1.7;
      `}
  }

  & button {
    ${(props) =>
      props.$iconPos === "left" &&
      css`
        padding-left: ${(props) => props.$paddingLeft};
        /* padding-left: 3.4rem; */
      `}

    ${(props) =>
      props.$placeholder &&
      css`
        background-color: var(--color-gray-300);
        color: var(--color-gray-700);
        font-weight: 500;
      `}
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: var(--border-radius-md);
  outline: 1.2px solid var(--color-gray-300);
  outline-offset: -1.2px;
  border: none;
  padding: ${(props) => props.$padding};
  /* padding: 0.4rem 0.8rem; */
  font-size: 1.6rem;
  color: var(--color-gray-500);
  background-color: var(--color-gray-0);
  text-align: left;

  &:focus,
  &:hover {
    // This matches devices without touch inputs (desktop)
    @media not ${mqHasTouchInputs} {
      outline: 1px solid var(--color-brand-600);
    }
  }
`;

function ButtonWithIcon({
  width = "13rem",
  padding = "0.4rem 0.8rem",
  placeholder = false,
  flex,
  icon,
  iconPos = "left",
  paddingLeft = "3.4rem",
  children,
  ...props
}) {
  return (
    <Wrapper
      $flex={flex}
      $width={width}
      $iconPos={iconPos}
      $placeholder={placeholder}
      $paddingLeft={paddingLeft}
    >
      <Button $iconPos={iconPos} $padding={padding} {...props}>
        {children}
      </Button>
      {icon}
    </Wrapper>
  );
}

export default ButtonWithIcon;
