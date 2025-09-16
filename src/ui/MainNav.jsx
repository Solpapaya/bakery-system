import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome, HiOutlineTicket } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    /* background-color: red; */
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.8rem;
    color: var(--color-gray-600);
    font-size: 1.4rem;
    font-weight: 400;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-gray-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    /* color: var(--color-gray-700); */
    stroke-width: 2.5;

    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    /* color: var(--color-brand-600); */
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        {/* <li>
          <StyledNavLink to="dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="tickets">
            <HiOutlineTicket />
            <span>Tickets</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
