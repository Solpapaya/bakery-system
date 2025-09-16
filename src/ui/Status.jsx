import styled, { css } from "styled-components";
import { LANG } from "../constants/language";
import { STATUS_OPTIONS } from "../constants/status";

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border-radius: var(--border-radius-lg);
  padding: 0.5rem;
  font-weight: 500;
  width: ${(props) => props.$width};

  ${(props) =>
    props.$status === "open" &&
    css`
      background-color: var(--color-teal-900);
      color: var(--color-gray-0);
    `}
  ${(props) =>
    props.$status === "paid" &&
    css`
      background-color: var(--color-brand-900);
      color: var(--color-gray-0);
    `};
  ${(props) =>
    props.$status === "closed" &&
    css`
      background-color: var(--color-gray-brand);
      color: var(--color-gray-0);
    `};
`;

function Status({ status, width = "100%" }) {
  const newStatus = status.toLowerCase();

  return (
    <StyledStatus $status={newStatus} $width={width}>
      <span>
        {
          STATUS_OPTIONS.filter((option) => option.key === status)[0].label[
            LANG
          ]
        }
      </span>
    </StyledStatus>
  );
}

export default Status;
