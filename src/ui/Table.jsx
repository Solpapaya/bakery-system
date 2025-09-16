import { createContext, useContext } from "react";
import styled from "styled-components";
import { mqWidth } from "../utils/mediaQueryHelpers";
import { TICKETS_OPERATIONS_HEIGHT } from "../constants/tickets";

const StyledTable = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: calc(${TICKETS_OPERATIONS_HEIGHT});

  @media ${mqWidth.tablet} {
    border: 1px solid var(--color-gray-200);
    border-radius: var(--border-radius-md);
    font-size: 1.4rem;
    color: var(--color-gray-700);
    overflow: hidden;
  }
`;

const CommonRow = styled.div`
  @media ${mqWidth.tablet} {
    display: grid;
    grid-template-columns: ${(props) => props.$columns};
    padding: 0.7rem 0rem 0.7rem 1rem;
    border-bottom: 1px solid var(--color-gray-200);
    column-gap: 2rem;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const StyledHeader = styled(CommonRow)`
  font-weight: 500;
  color: var(--color-gray-700);
  background-color: var(--color-gray-300);
  border-bottom: none;
  /* padding: 0.7rem 0.5rem; */
`;

const StyledBody = styled.div``;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Body({ children }) {
  return <StyledBody>{children}</StyledBody>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <CommonRow role="row" $columns={columns}>
      {children}
    </CommonRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
