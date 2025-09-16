import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";

const ErrorMessage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-red-1000);
  color: var(--color-gray-0);
  margin-top: ${(props) => props.$marginTop};
`;

const ErrorMessageIconWrapper = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  background-color: transparent;
  border: none;

  & svg {
    display: block;
    stroke-width: 2;
  }
`;

function FormErrorMessage({ message, onClose, marginTop }) {
  return (
    <ErrorMessage $marginTop={marginTop}>
      <span>{message}</span>
      <ErrorMessageIconWrapper onClick={() => onClose("")}>
        <HiOutlineXMark />
      </ErrorMessageIconWrapper>
    </ErrorMessage>
  );
}

export default FormErrorMessage;
