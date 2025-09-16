import styled from "styled-components";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import NavBarMobile from "./NavBarMobile";
import { useState } from "react";
import { HEADER_HEIGHT } from "../constants/header";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const StyledSidebarMobile = styled.header`
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  background-color: var(--color-brand-1000);

  &.hidden {
    transform: translateY(-100%);
  }
`;

const Logo = styled.img`
  /* width: 5rem; */
  height: 5rem;
`;

const IconWrapper = styled.button`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  & svg {
    display: block;
    color: var(--color-gray-0);
    width: 2.7rem;
    height: 2.7rem;
    stroke-width: ${(props) => props.$strokeWidth || 1.7};
  }
`;

const HeaderMobile = function HeaderMobile() {
  const [openNavBar, setOpenNavBar] = useState(false);
  const headerRef = useScrollAnimation();

  return (
    <>
      <StyledSidebarMobile ref={headerRef}>
        {/* <Logo src="" /> */}
        <IconWrapper
          $strokeWidth="1.1"
          onClick={() => setOpenNavBar((prev) => !prev)}
        >
          <HiOutlineBuildingStorefront />
        </IconWrapper>
      </StyledSidebarMobile>

      {openNavBar && <NavBarMobile setOpenNavBar={setOpenNavBar} />}
    </>
  );
};

export default HeaderMobile;
