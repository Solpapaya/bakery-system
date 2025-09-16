import styled from "styled-components";

import DateFilter from "./DateFilter";
import StatusFilter from "./StatusFilter";

const StyledFilter = styled.div`
  display: flex;
  gap: var(--flex-gap-tiny);
`;

function Filter() {
  return (
    <StyledFilter>
      <DateFilter />
      <StatusFilter />
      {/* <ClearButton>Clear Filters</ClearButton> */}
    </StyledFilter>
  );
}

export default Filter;
