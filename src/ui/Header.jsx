import styled from "styled-components";
import UserAvatar from "../features/authentication/User";
import UserNotification from "./UserNotification";

const StyledHeader = styled.header`
  grid-column: 2;
  grid-row: 1;
  padding: 0.5rem 1rem;
  height: 5rem;
  /* width: 100%; */
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-gray-100);
`;

function Header() {
  return (
    <StyledHeader>
      {/* <UserNotification /> */}
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
