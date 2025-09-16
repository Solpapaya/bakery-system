import styled, { css } from "styled-components";
import { mqHeight } from "../utils/mediaQueryHelpers";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  /* background-color: var(--color-gray-300); */
  background-color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-md);
  padding: 0.2rem 1rem;
  color: var(--color-gray-500);

  @media ${mqHeight.iphone15ProMax} {
    padding: 0.4rem 1rem;
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-1000);
      color: var(--color-gray-0);
      /* background-color: var(--color-gray-700);
      color: var(--color-gray-0); */
    `}

  & svg {
    display: block;
    stroke-width: 1.8;
    /* stroke-width: 2; */
    color: var(--color-brand-600);
    /* color: var(--color-brand-1000); */
    width: 1.4rem;
    height: 1.4rem;

    @media ${mqHeight.iphone15ProMax} {
      width: 1.6rem;
      height: 1.6rem;
    }

    ${(props) =>
      props.$active &&
      css`
        color: var(--color-gray-0);
      `}
  }
`;

function ButtonWithIconInside({ active, icon, children, ...props }) {
  return (
    <Button $active={active} {...props}>
      <span>{children}</span>
      <span>{icon}</span>
    </Button>
  );
}

export default ButtonWithIconInside;
