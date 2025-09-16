import styled from "styled-components";
import { HiOutlineBell } from "react-icons/hi2";

const StyledUserNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid var(--color-gray-200); */
  /* width: 4rem; */
  margin-right: 2rem;

  & svg {
    stroke-width: 2;
    color: var(--color-gray-600);
  }
`;

function UserNotification() {
  return (
    <StyledUserNotification>
      <HiOutlineBell />
    </StyledUserNotification>
  );
}

export default UserNotification;
