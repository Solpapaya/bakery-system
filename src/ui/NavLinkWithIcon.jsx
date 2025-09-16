import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mqHasTouchInputs } from "../utils/mediaQueryHelpers";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.$iconMarginLeft};
  top: 50%;
  transform: translateY(-50%);

  & svg {
    display: block;
    color: var(--color-brand-1000);
    width: ${(props) => props.$iconWidth};
    height: ${(props) => props.$iconHeight};
    stroke-width: ${(props) => props.$iconStrokeWidth};
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  color: var(--color-gray-500);
  border: none;
  outline: 1.2px solid var(--color-gray-300);
  outline-offset: -1.2px;
  border-radius: var(--border-radius-md);
  background-color: var(--color-gray-0);
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  padding-left: ${(props) => props.$paddingLeft};

  &:focus,
  &:hover {
    // This matches devices without touch inputs (desktop)
    @media not ${mqHasTouchInputs} {
      outline: 1px solid var(--color-brand-600);
    }
  }
`;

function NavLinkWithIcon({
  icon,
  width = "100%",
  padding = "1rem",
  paddingLeft = "3.8rem",
  iconWidth = "1.6rem",
  iconHeight = "1.6rem",
  iconStrokeWidth = null,
  iconMarginLeft = "1rem",
  children,
  ...props
}) {
  return (
    <Wrapper>
      <IconWrapper
        $iconWidth={iconWidth}
        $iconHeight={iconHeight}
        $iconStrokeWidth={iconStrokeWidth}
        $iconMarginLeft={iconMarginLeft}
      >
        {icon}
      </IconWrapper>
      <StyledNavLink
        // $placeholder={placeholder}
        $width={width}
        $padding={padding}
        $paddingLeft={paddingLeft}
        {...props}
      >
        {children}
      </StyledNavLink>
    </Wrapper>
  );
}

export default NavLinkWithIcon;
