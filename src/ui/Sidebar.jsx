import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  border-right: 1px solid var(--color-gray-100);
  background-color: var(--color-gray-0);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
