import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import HeaderMobile from "./HeaderMobile";
import { useMobile } from "../context/MobileContext";
import { mqWidth } from "../utils/mediaQueryHelpers";
import { HEADER_HEIGHT } from "../constants/header";
import { useEffect } from "react";
import { scrollToTop } from "../utils/helpers";
import PageConstraint from "./PageConstraint";

const StyledAppLayout = styled.div`
  height: 100%;
  width: 100dvw;
  position: relative;

  @media ${mqWidth.tablet} {
    display: grid;
    grid-template-columns: 17rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100dvh;
  }
`;

const Main = styled.main`
  margin-top: ${HEADER_HEIGHT};
  padding: 0.5rem 1.5rem;
`;

function AppLayout() {
  const { isMobile } = useMobile();
  const path = useLocation().pathname;
  useEffect(() => {
    scrollToTop(-200);
  }, [path]);

  return (
    <StyledAppLayout>
      {isMobile ? <HeaderMobile /> : <Sidebar />}
      <Main>
        {!isMobile && <PageConstraint />}
        {isMobile && <Outlet />}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
