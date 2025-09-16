import styled, { css } from "styled-components";

const Wrapper = styled.li`
  flex: 1;
  position: relative;
  width: ${(props) => props.$width};
  left: 0;
  background-color: transparent;

  & svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    stroke-width: 2.5;
    width: 1.2rem;
    height: 1.2rem;
    color: var(--color-gray-600);
    transition: all 0.3s;

    ${(props) =>
      props.$iconPos === "left" &&
      css`
        left: 0;
        /* left: 0.8rem; */
      `}

    ${(props) =>
      props.$iconPos === "right" &&
      css`
        right: 0;
        /* right: 0.8rem; */
      `}

      ${(props) =>
      props.$active &&
      css`
        color: var(--color-brand-1000);
      `}
  }
`;

const Li = styled.div`
  /* font-weight: 500; */
  /* text-transform: uppercase; */
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.4rem 0;

  /* font-size: 1rem; */
  font-size: 1.6rem;

  transition: color 0.3s;

  color: var(--color-gray-500);
  ${(props) =>
    props.$active &&
    css`
      color: var(--color-gray-700);
      font-weight: 600;
    `}

  ${(props) =>
    props.$iconPos === "left" &&
    css`
      padding-left: 1.6rem;
    `}


  

  &:focus,
  &:hover {
    /* outline: 1px solid var(--color-brand-600); */
    cursor: pointer;
  }
`;

const SelectLi = styled.span`
  position: absolute;
  bottom: -2px;
  height: 2px;
  width: 0%;
  background-color: var(--color-brand-1000);
  z-index: 1;
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      width: 100%;
    `}
`;

function LiWithIcon({
  width = "auto",
  icon,
  iconPos = "left",
  active,
  children,
  ...props
}) {
  return (
    <Wrapper $width={width} $iconPos={iconPos} $active={active}>
      <Li $iconPos={iconPos} $active={active} {...props}>
        {children}
      </Li>
      {icon}
      <SelectLi $active={active} />
    </Wrapper>
  );
}

export default LiWithIcon;
