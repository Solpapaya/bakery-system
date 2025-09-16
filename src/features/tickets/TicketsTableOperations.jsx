import styled from "styled-components";
import Button from "../../ui/Button";
import Filter from "../../ui/Filter";
import TicketsActionButtons from "./TicketsActionButtons";

const StyledTicketsTableOperations = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function TicketsTableOperations() {
  return (
    <StyledTicketsTableOperations>
      <Filter />
      <TicketsActionButtons />
    </StyledTicketsTableOperations>
  );
}

export default TicketsTableOperations;
