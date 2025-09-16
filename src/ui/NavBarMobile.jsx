import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  HiOutlineTicket,
  HiOutlineUser,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0); // black with 50% opacity
  /* backdrop-filter: blur(0px); // optional: adds a blur effect */
  z-index: 10;
  transition: all 0.3s;

  &.open {
    background-color: rgba(0, 0, 0, 0.5); /* black with 50% opacity */
    /* backdrop-filter: blur(2px); // optional: adds a blur effect */

    & #navBar {
      left: 0;
    }
  }
`;

const NavBar = styled.nav`
  position: absolute;
  left: -70dvw;
  background-color: var(--color-gray-50);
  width: 70dvw;
  height: 100dvh;
  z-index: 2;
  transition: left 0.3s;
`;

const InsideNavBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UserInfoWrapper = styled.div`
  padding: 2rem 2rem;
  background-color: var(--color-brand-1000);
  border-bottom-right-radius: 3rem;
`;

const UserName = styled.div`
  font-weight: 500;
  color: var(--color-gray-0);
`;

const UserPosition = styled.div`
  color: var(--color-gray-200);
  font-size: 1.4rem;
`;

const LinksWrapper = styled.div`
  margin: 2rem 1rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-1000);
      color: var(--color-gray-0);
      font-weight: 500;

      & div svg {
        color: var(--color-gray-0);
        stroke-width: 2.2;
      }
    `}
`;

const NavItemWithSubNav = styled(NavItem)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  ${(props) =>
    props.$active &&
    css`
      transform: rotate(180deg);
    `}

  & svg {
    display: block;
    stroke-width: ${(props) => props.$strokeWidth || 2};
    color: ${(props) => props.$color || "var(--color-brand-1000)"};
  }
`;

const SubNavItemWrapper = styled.li`
  border-left: 3px solid var(--color-gray-300);
  border-radius: 0;
  margin-left: 2.5rem;
  padding-left: 2.5rem;

  ${(props) =>
    props.$active &&
    css`
      border-left: 1.3rem solid var(--color-brand-1000);

      a {
        background-color: transparent;
        color: var(--color-brand-1000);
        font-weight: 500;
      }
    `}
`;

const LogOutWrapper = styled.button`
  position: absolute;
  bottom: 3rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: transparent;
  border: none;
  width: calc(100% - 2rem);
  border-radius: var(--border-radius-md);
  padding: 1rem 1rem;
`;

function NavBarMobile({ setOpenNavBar }) {
  const path = useLocation().pathname;
  const navBarRef = useRef();
  const [subList, setSubList] = useState(path.split("/")[1]);

  useEffect(() => {
    requestAnimationFrame(() => {
      navBarRef.current.classList.add("open");
    });
  }, [navBarRef]);

  function handleCloseNavBar() {
    navBarRef.current.classList.remove("open");
    setTimeout(() => {
      setOpenNavBar(false);
    }, 301);
  }

  function handleOpenSubList(e, key) {
    e.stopPropagation();

    if (subList !== "" && subList === key) setSubList("");
    else setSubList(key);
  }

  return createPortal(
    <Wrapper ref={navBarRef} onClick={handleCloseNavBar}>
      <NavBar id="navBar">
        <InsideNavBarWrapper>
          <UserInfoWrapper>
            <UserName>Lionel Messi</UserName>
            <UserPosition>Admin</UserPosition>
          </UserInfoWrapper>

          <LinksWrapper>
            <NavList>
              <li>
                <NavItem
                  to="tickets"
                  $active={path.split("/")[1] === "tickets"}
                >
                  <IconWrapper>
                    <HiOutlineTicket />
                  </IconWrapper>
                  <span>Tickets</span>
                </NavItem>
              </li>
              <NavItemWithSubNav
                as="li"
                onClick={(e) => {
                  handleOpenSubList(e, "items");
                }}
                $active={path.split("/")[1] === "items"}
              >
                <MainNav>
                  <IconWrapper $strokeWidth="1.7" $activeStrokeWidth="1.9">
                    <LuCroissant />
                  </IconWrapper>
                  <span>Productos</span>
                </MainNav>
                <IconWrapper $active={subList === "items"}>
                  <HiOutlineChevronDown />
                </IconWrapper>
              </NavItemWithSubNav>
              {subList === "items" && (
                <NavList>
                  <SubNavItemWrapper
                    $active={
                      path.split("/")[1] === "items" &&
                      path.split("/")?.[2] !== "categories"
                    }
                  >
                    <NavItem to="items">Todos</NavItem>
                  </SubNavItemWrapper>
                  <SubNavItemWrapper
                    $active={
                      path.split("/").slice(1, 3).join("/") ===
                      "items/categories"
                    }
                  >
                    <NavItem to="items/categories">Categorias</NavItem>
                  </SubNavItemWrapper>
                </NavList>
              )}
            </NavList>
          </LinksWrapper>

          <LogOutWrapper>
            <IconWrapper $color="var(--color-red-1000)">
              <CiLogout />
            </IconWrapper>
            <span>Log Out</span>
          </LogOutWrapper>
        </InsideNavBarWrapper>
      </NavBar>
    </Wrapper>,
    document.body
  );
}

export default NavBarMobile;
