import styled from "styled-components";

import StatusFilter from "../../ui/StatusFilter";
import ScrollFiltersMobile from "../../ui/ScrollFiltersMobile";
import SearchInput from "../../ui/SearchInput";
import { useTickets } from "../../context/TicketsContext";
import { STATUS_OPTIONS } from "../../constants/status";
import { LANG } from "../../constants/language";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { TICKETS_OPERATIONS_HEIGHT } from "../../constants/tickets";
import { HEADER_HEIGHT } from "../../constants/header";

const Operations = styled.section`
  height: ${TICKETS_OPERATIONS_HEIGHT};
  padding: 0.5rem 1.5rem;
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  transition: transform 0.3s ease;
  z-index: 4;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--color-gray-50);

  &.hidden {
    transform: translateY(-150%);
  }
`;

function TicketsTableOperationsMobile() {
  const { statusCounts } = useTickets();
  const statusOptions = STATUS_OPTIONS.map((option) => ({
    ...option,
    label: option.label[LANG],
    count: statusCounts[option.key],
  }));
  const operationsRef = useScrollAnimation();

  return (
    <Operations ref={operationsRef}>
      <SearchInput />
      <ScrollFiltersMobile />
      <StatusFilter filterField="status" options={statusOptions} />
    </Operations>
  );
}

export default TicketsTableOperationsMobile;
