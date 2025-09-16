import styled from "styled-components";

const StyledAcceptButton = styled.button`
  width: 100%;
  border: none;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  margin-top: ${(props) => props.$marginTop};
  margin-bottom: ${(props) => props.$marginBottom};
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$backgroundColor};
  height: ${(props) => props.$height};
  padding: ${(props) => props.$padding};

  &:disabled {
    background-color: var(--color-gray-100);
  }
`;

function AcceptButton({
  height,
  marginTop = "1.3rem",
  marginBottom = "0",
  color = "var(--color-gray-0)",
  backgroundColor = "var(--color-brand-1000)",
  padding = "1rem",
  children,
  ...props
}) {
  return (
    <StyledAcceptButton
      $marginTop={marginTop}
      $marginBottom={marginBottom}
      $color={color}
      $backgroundColor={backgroundColor}
      $height={height}
      $padding={padding}
      {...props}
    >
      {children}
    </StyledAcceptButton>
  );
}

export default AcceptButton;
