import styled, { css } from "styled-components";
import Status from "../../ui/Status";

import { HiOutlineBanknotes, HiOutlineCreditCard } from "react-icons/hi2";
import { mqWidth } from "../../utils/mediaQueryHelpers";
import { useNavigate } from "react-router-dom";
import { getDateShortcut, getDaysLeft } from "../../utils/helpers";
import { TICKET_DANGER_DAYS } from "../../constants/tickets";

const StyledTicketRowMobile = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1.7fr;

  @media ${mqWidth.tablet} {
    grid-template-columns: 3fr 1.2fr;
  }
  column-gap: 0.4rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-md);
  outline: 1.5px solid var(--color-gray-300);
  outline-offset: -1.5px;
  margin-bottom: 0.8rem;
  background-color: var(--color-gray-0);

  &:hover {
    cursor: pointer;
  }
`;

const TicketPrimaryInfo = styled.div`
  font-weight: 500;
`;

const TicketPrimaryInfoWithIcon = styled(TicketPrimaryInfo)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-gray-600);
    stroke-width: 1.7;
    display: block;
  }
`;

const TicketSummaryInfo = styled.div`
  color: var(--color-gray-600);
`;

const TicketGroupLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketGroupRight = styled(TicketGroupLeft)`
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;

const TicketLeftCircle = styled.div`
  position: absolute;
  left: -0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const LeftCircle = styled.circle`
  fill: var(--color-gray-50);
  stroke: var(--color-gray-300);
  stroke-width: 10;
  stroke-dasharray: 150 150;
  stroke-dashoffset: 75;
`;

const TicketRightCircle = styled.div`
  position: absolute;
  right: -0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const RightCircle = styled(LeftCircle)`
  stroke-dashoffset: 225;
`;

const ShortcutDate = styled.span`
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-sm);
  padding: 0rem 0.4rem;
  font-weight: 400;

  ${(props) =>
    props.$danger &&
    css`
      background-color: var(--color-red-1000);
      color: var(--color-gray-0);
    `}
`;

function TicketRowMobile({ ticket }) {
  const navigate = useNavigate();
  const dateShortcut = getDateShortcut(ticket?.deliveryDate);
  const daysLeft = getDaysLeft(ticket?.deliveryDate);
  return (
    <StyledTicketRowMobile
      role="row"
      onClick={() => {
        navigate(ticket.id.toString());
      }}
    >
      <TicketLeftCircle>
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 100 100">
          <LeftCircle cx="50" cy="50" r="48" />
        </svg>
      </TicketLeftCircle>
      <TicketRightCircle>
        <svg width="1.5rem" height="1.5rem" viewBox="0 0 100 100">
          <RightCircle cx="50" cy="50" r="48" />
        </svg>
      </TicketRightCircle>
      <TicketGroupLeft>
        <TicketPrimaryInfo>{ticket.customerFullName}</TicketPrimaryInfo>
        <div>
          <ShortcutDate
            $danger={
              ticket.status !== "closed" &&
              daysLeft <= 0 &&
              daysLeft >= -TICKET_DANGER_DAYS
            }
          >
            {dateShortcut}
          </ShortcutDate>
        </div>
        <TicketSummaryInfo>
          {ticket.productCount}{" "}
          {ticket.productCount > 1 ? "Productos" : "Producto"}
        </TicketSummaryInfo>
      </TicketGroupLeft>
      <TicketGroupRight>
        <TicketPrimaryInfoWithIcon>
          <span>
            {ticket.status === "open" ? (
              ""
            ) : ticket.paymentMethod.toLowerCase() === "cash" ? (
              <HiOutlineBanknotes />
            ) : (
              <HiOutlineCreditCard />
            )}
          </span>
          <span>${ticket.total}</span>
        </TicketPrimaryInfoWithIcon>
        <Status status={ticket.status} width="90%" />
      </TicketGroupRight>
    </StyledTicketRowMobile>
  );
}

export default TicketRowMobile;
