import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  padding: 1rem 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
`;

function Button({
  backgroundColor = "var(--color-brand-1000)",
  color = "var(--color-gray-0)",
  children,
}) {
  return (
    <StyledButton $backgroundColor={backgroundColor} $color={color}>
      {children}
    </StyledButton>
  );
}

export default Button;
