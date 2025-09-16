import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Wrapper = styled.section`
  position: fixed;
  bottom: 5rem;
  width: 6rem;
  height: 6rem;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s ease;

  &.hidden {
    transform: translate(-50%, 200%);
  }
`;

const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-brand-1000);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */

  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  & svg {
    display: block;
    width: 5rem;
    height: 5rem;
    color: var(--color-gray-0);
    stroke-width: 3;
  }
`;

function CreateButton() {
  const buttonRef = useScrollAnimation();
  return (
    <Wrapper ref={buttonRef}>
      <StyledNavLink to="new">
        <HiOutlinePlus />
      </StyledNavLink>
    </Wrapper>
  );
}

export default CreateButton;
