import styled from "styled-components";
import { mqHeight } from "../utils/mediaQueryHelpers";

export const AcceptButton = styled.button`
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
  border: none;
  padding: 1rem 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  margin-top: 3rem;
  width: 70%;

  @media ${mqHeight.iphone15ProMax} {
    margin-top: 4rem;
    padding: 1.5rem 1rem;
  }
`;

export const ResetButton = styled(AcceptButton)`
  width: 30%;
  background-color: transparent;
  color: var(--color-gray-500);
  outline: 2px solid var(--color-gray-400);
  outline-offset: -2px;
`;
