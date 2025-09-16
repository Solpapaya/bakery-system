import styled, { css } from "styled-components";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import Table from "../../ui/Table";

const Options = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  /* justify-content: flex-end; */

  &:focus {
    outline: none;
  }

  & svg {
    color: var(--color-gray-500);
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border-radius: var(--border-radius-lg);
  padding: 0.5rem;

  ${(props) =>
    props.$status === "abierto" &&
    css`
      background-color: var(--color-teal-100);
      color: var(--color-teal-900);
    `}
  ${(props) =>
    props.$status === "cerrado" &&
    css`
      background-color: var(--color-yellow-100);
      color: var(--color-yellow-900);
    `};
`;

function TicketRow({ ticket }) {
  const { id, customerFullName, createdAt, status, total, productCount } =
    ticket;

  return (
    <Table.Row>
      <div>#{id}</div>
      <div>{customerFullName}</div>
      <div>{createdAt}</div>

      <div>{total}</div>
      <div>{productCount}</div>
      <div>Efectivo</div>
      <Status $status={status.toLowerCase()}>{status}</Status>
      <Options>
        <HiOutlineEllipsisVertical />
      </Options>
    </Table.Row>
  );
}

export default TicketRow;
