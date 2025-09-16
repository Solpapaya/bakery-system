import styled, { css } from "styled-components";
import { mqHasTouchInputs } from "../utils/mediaQueryHelpers";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) =>
    props.$iconPosition === "left"
      ? css`
          left: ${(props) => props.$iconMargin};
        `
      : css`
          right: ${(props) => props.$iconMargin};
        `}

  & svg {
    display: block;
    color: var(--color-brand-1000);
    width: ${(props) => props.$iconWidth};
    height: ${(props) => props.$iconHeight};
    stroke-width: ${(props) => props.$iconStrokeWidth};

    ${(props) =>
      props.$selected &&
      css`
        stroke-width: ${(props) => props.$iconStrokeWidthSelected};
      `}
  }
`;

const StyledTag = styled.div`
  display: block;
  border: none;
  outline: ${(props) => props.$outline};
  outline-offset: -${(props) => props.$outline.split(" ")[0]};
  border-radius: var(--border-radius-md);
  background-color: var(--color-gray-0);
  color: var(--color-gray-500);
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  text-align: ${(props) => props.$textAlign};
  text-transform: ${(props) => props.$textTransform};

  ${(props) =>
    props.$tag !== "input" &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props.$danger &&
    css`
      outline: ${(props) => props.$outlineDanger};
    `}

  ${(props) =>
    !props.$activePlaceholder &&
    css`
      color: var(--color-gray-1000);
    `}

  ${(props) =>
    props.$iconPosition === "left"
      ? css`
          padding-left: ${(props) => props.$paddingTagForIconSpace};
        `
      : css`
          padding-right: ${(props) => props.$paddingTagForIconSpace};
        `}

  &:focus,
  &:hover {
    // This matches devices without touch inputs (desktop)
    @media not ${mqHasTouchInputs} {
      outline: 1px solid var(--color-brand-600);
    }
  }

  &::placeholder {
    color: var(--color-gray-500);
  }

  ${(props) =>
    props.$tag === "input" &&
    css`
      color: var(--color-gray-1000);
    `}

  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-gray-300);
      color: var(--color-gray-700);
      font-weight: 500;
    `}
`;

function TagWithIcon({
  as,
  icon,
  selected = false,
  width = "100%",
  padding = "1rem",
  paddingTagForIconSpace = "3.8rem",
  outline = "1.2px solid var(--color-gray-300)",
  textAlign = "left",
  activePlaceholder = true,
  iconWidth = "1.6rem",
  iconHeight = "1.6rem",
  iconStrokeWidth = null,
  iconStrokeWidthSelected = "1.7",
  iconMargin = "1rem",
  iconPosition = "left",
  danger = false,
  outlineDanger = "1.5px solid var(--color-red-1000)",
  textTransform = "",
  children,
  ...props
}) {
  const wrapperRef = useRef();

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        document.activeElement === wrapperRef.current.querySelector("input")
      ) {
        switch (e.key) {
          case "Enter":
            wrapperRef.current.querySelector("input").blur();
            break;
        }
      }
    }

    if (as === "input") window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (as === "input") window.removeEventListener("keydown", handleKeyDown);
    };
  }, [as]);

  return (
    <Wrapper ref={wrapperRef}>
      <IconWrapper
        $iconPosition={iconPosition}
        $iconWidth={iconWidth}
        $iconHeight={iconHeight}
        $iconStrokeWidth={iconStrokeWidth}
        $iconMargin={iconMargin}
        $iconStrokeWidthSelected={iconStrokeWidthSelected}
        $selected={selected}
      >
        {icon}
      </IconWrapper>
      {as === "input" ? (
        <StyledTag
          as={as}
          $tag={as}
          $selected={selected}
          $width={width}
          $padding={padding}
          $paddingTagForIconSpace={paddingTagForIconSpace}
          $outline={outline}
          $iconPosition={iconPosition}
          $textAlign={textAlign}
          $activePlaceholder={activePlaceholder}
          $danger={danger}
          $outlineDanger={outlineDanger}
          $textTransform={textTransform}
          {...props}
        />
      ) : (
        <StyledTag
          as={as}
          $selected={selected}
          $width={width}
          $padding={padding}
          $paddingTagForIconSpace={paddingTagForIconSpace}
          $outline={outline}
          $iconPosition={iconPosition}
          $textAlign={textAlign}
          $activePlaceholder={activePlaceholder}
          $danger={danger}
          $outlineDanger={outlineDanger}
          $textTransform={textTransform}
          {...props}
        >
          {children}
        </StyledTag>
      )}
    </Wrapper>
  );
}

export default TagWithIcon;
