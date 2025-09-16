import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding-top: ${(props) => props.$paddingTop};
  padding-bottom: ${(props) => props.$paddingBottom};
`;

const HeaderText = styled.div`
  margin-left: ${(props) => props.$marginLeftHeaderText};
`;

const IconContainer = styled.div`
  position: absolute;
  left: 0;
  background-color: var(--color-brand-800);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;

  & svg {
    display: block;
    width: 4rem;
    height: 2rem;
    stroke-width: 2;
    color: var(--color-gray-0);
  }

  &:hover {
    cursor: pointer;
  }
`;

function SlidingWindow({
  headerText,
  previousPage = "/",
  header = true,
  paddingTop = "1.5rem",
  paddingBottom = "1.5rem",
  marginLeftHeaderText = "0",
  children,
}) {
  const navigate = useNavigate();

  return (
    <>
      {header && (
        <Header $paddingTop={paddingTop} $paddingBottom={paddingBottom}>
          <IconContainer onClick={() => navigate(previousPage)}>
            <HiOutlineArrowLongLeft />
          </IconContainer>
          <HeaderText $marginLeftHeaderText={marginLeftHeaderText}>
            {headerText}
          </HeaderText>
        </Header>
      )}

      {children}
    </>
  );
}

export default SlidingWindow;
