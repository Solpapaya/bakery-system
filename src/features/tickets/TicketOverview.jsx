import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { HiOutlineBanknotes, HiOutlineCreditCard } from "react-icons/hi2";
import { getTicket } from "./useTicketsData";
import { STATUS_OPTIONS } from "../../constants/status";
import { LANG } from "../../constants/language";
import { getDateShortcut, getDaysLeft } from "../../utils/helpers";
import Loading from "../../ui/Loading";
import SlidingWindow from "../../ui/SlidingWindow";
import AcceptButton from "../../ui/AcceptButton";
import toast from "react-hot-toast";
import { useScroll } from "../../context/useScrollContext";
import ConfirmModal from "../../ui/ConfirmModal";
import {
  TICKET_DANGER_DAYS,
  TICKET_PAYMENT_OPTIONS,
} from "../../constants/tickets";

const Ticket = styled.section`
  background-color: var(--color-gray-0);
  padding: 1.2rem;
  border-radius: var(--border-radius-lg);
  outline: 2px solid var(--color-gray-300);
  outline-offset: -2px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-x: hidden;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const TicketStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  text-align: center;
  padding: 1.5rem 2.3rem;
  font-weight: 500;
  text-transform: uppercase;

  ${(props) =>
    props.$status === "open" &&
    css`
      background-color: var(--color-teal-900);
    `}
  ${(props) =>
    props.$status === "paid" &&
    css`
      background-color: var(--color-brand-900);
    `}
  ${(props) =>
    props.$status === "closed" &&
    css`
      background-color: var(--color-gray-brand);
    `}
`;

const IconWrapper = styled.div`
  & svg {
    display: block;
    stroke-width: 2.3;

    ${(props) =>
      props.$status === "paid" &&
      css`
        stroke-width: 2;
      `}
  }
`;

const TicketHeaderTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TicketTitle = styled.div`
  font-weight: 500;
  font-size: 2rem;
`;

const TicketSubtitle = styled.div`
  color: var(--color-gray-700);
`;

const TicketInfo = styled.div`
  position: relative;
  padding-top: 2rem;
  border-top: 1.5px dashed var(--color-gray-400);
`;

const TicketFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const TicketInfoLabel = styled.div`
  color: var(--color-gray-500);
  font-weight: 500;
  font-size: 1.4rem;
`;

const TicketInfoValue = styled.div`
  font-weight: 500;
`;

const DeliveryDate = styled(TicketInfoValue)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

const TicketItems = styled.div`
  padding-top: 2rem;
  border-top: 1.5px dashed var(--color-gray-400);
`;

const TicketItemsColumns = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr 5rem;
  column-gap: 1rem;
  color: var(--color-gray-500);
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const TicketItem = styled(TicketItemsColumns)`
  font-weight: 500;
  font-size: 1.6rem;
  color: var(--color-gray-1000);
  margin-bottom: 0.3rem;
`;

const TicketItemQuantity = styled.div`
  text-align: center;
`;

const TicketItemPrice = styled.div`
  text-align: center;
`;

const TicketTotal = styled.div`
  padding-top: 2rem;
  border-top: 1.5px dashed var(--color-gray-400);
  display: grid;
  grid-template-columns: 4rem 1fr 5rem;
  column-gap: 1rem;
`;

const TicketTotalValue = styled.div`
  text-align: center;
  font-weight: 500;
`;

const TicketLeftCircle = styled.div`
  position: absolute;
  left: -2.7rem;
  top: 0;
  transform: translateY(-45%);
`;

const LeftCircle = styled.circle`
  fill: var(--color-gray-50);
  stroke: var(--color-gray-300);
  stroke-width: 6;
  stroke-dasharray: 150 150;
  stroke-dashoffset: 75;
`;

const TicketRightCircle = styled.div`
  position: absolute;
  right: -2.7rem;
  top: 0;
  transform: translateY(-45%);
`;

const RightCircle = styled(LeftCircle)`
  stroke-dashoffset: 225;
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  margin-top: 1rem;
`;

const PaymentOption = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-gray-0);
  padding: 1.5rem 1.2rem;
  border-radius: var(--border-radius-lg);
  outline: 2px solid var(--color-gray-300);
  outline-offset: -2px;

  ${(props) =>
    props.$selected &&
    css`
      outline: 2px solid var(--color-brand-1000);
      color: var(--color-brand-1000);
      font-weight: 500;

      &:focus {
        outline: 2px solid var(--color-brand-1000);
      }

      & svg {
        stroke-width: 1.8;
      }
    `}
`;

const PaymentOptionIcon = styled.div`
  margin-bottom: 1rem;
  & svg {
    display: block;
    width: 2.8rem;
    height: 2.8rem;
  }
`;

function TicketOverview() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const [modal, setModal] = useState(false);
  const [payMode, setPayMode] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusIcon, setStatusIcon] = useState(null);
  const StatusIcon = statusIcon;
  const dateShortcut = getDateShortcut(ticket?.deliveryDate);
  const daysLeft = getDaysLeft(ticket?.deliveryDate);
  const { setTopMinScrollY } = useScroll();
  const total =
    ticket &&
    ticket.items.reduce((acc, item) => {
      acc = acc + item.price * item.quantity;
      return acc;
    }, 0);

  useEffect(() => {
    setTopMinScrollY(90);
  }, [setTopMinScrollY]);

  useEffect(() => {
    const ticketQueried = getTicket(parseInt(ticketId));
    setTicket(ticketQueried);
    setStatusIcon(
      () =>
        STATUS_OPTIONS.find((option) => option.key === ticketQueried.status)
          .icon
    );
  }, [ticketId]);

  function handlePrimaryButton(ticketStatus) {
    switch (ticketStatus) {
      case "open":
        if (!payMode) return setPayMode(true);
        if (payMode && paymentOption !== "") return setModal(true);
        break;
      case "paid":
        setModal(true);
        break;
      default:
        console.error("There is no ticket status.");
        break;
    }
  }

  function handleSecondaryButton() {
    if (payMode) return setPayMode(false);
    navigate("edit");
  }

  function handleChangeTicketStatus() {
    setLoading(true);

    // Change ticket status in DB
    setTimeout(() => {
      setLoading(false);
      toast.success(
        `Ticket ${ticket.status === "open" ? "pagado" : "cerrado"} con éxito`
      );
      navigate("/tickets");
    }, 500);
  }

  if (!ticket) return <Loading open={true} />;

  return (
    <SlidingWindow previousPage="/tickets" headerText="Ticket">
      <Ticket>
        <TicketHeader>
          <TicketHeaderTotal>
            <TicketTitle>${total}</TicketTitle>
            <TicketSubtitle>Total</TicketSubtitle>
          </TicketHeaderTotal>
          <TicketStatus $status={ticket.status}>
            <IconWrapper $status={ticket.status}>
              {statusIcon && <StatusIcon />}
            </IconWrapper>
            <span>
              {
                STATUS_OPTIONS.find((option) => option.key === ticket.status)
                  .label[LANG]
              }
            </span>
          </TicketStatus>
        </TicketHeader>

        <TicketInfo>
          <TicketLeftCircle>
            <svg width="3rem" height="3rem" viewBox="0 0 100 100">
              <LeftCircle cx="50" cy="50" r="48" />
            </svg>
          </TicketLeftCircle>
          <TicketRightCircle>
            <svg width="3rem" height="3rem" viewBox="0 0 100 100">
              <RightCircle cx="50" cy="50" r="48" />
            </svg>
          </TicketRightCircle>
          <TicketFieldWrapper>
            <TicketInfoLabel>No. Ticket</TicketInfoLabel>
            <TicketInfoValue>#{ticket.id}</TicketInfoValue>
          </TicketFieldWrapper>
          <TicketFieldWrapper>
            <TicketInfoLabel>Cliente</TicketInfoLabel>
            <TicketInfoValue>{ticket.customerFullName}</TicketInfoValue>
          </TicketFieldWrapper>
          <TicketFieldWrapper>
            <TicketInfoLabel>Fecha Entrega</TicketInfoLabel>
            <DeliveryDate>
              <ShortcutDate
                $danger={
                  ticket.status !== "closed" &&
                  daysLeft <= 0 &&
                  daysLeft >= -TICKET_DANGER_DAYS
                }
              >
                {dateShortcut}
              </ShortcutDate>
              <span>{ticket.deliveryDate}</span>
            </DeliveryDate>
          </TicketFieldWrapper>
          <TicketFieldWrapper>
            <TicketInfoLabel>No. Productos</TicketInfoLabel>
            <TicketInfoValue>{ticket.productCount}</TicketInfoValue>
          </TicketFieldWrapper>
        </TicketInfo>

        <TicketItems>
          <TicketItemsColumns>
            <div>Cant.</div>
            <div>Producto</div>
            <div>Precio</div>
          </TicketItemsColumns>
          {ticket.items.map((item) => (
            <TicketItem key={item.name}>
              <TicketItemQuantity>{item.quantity}</TicketItemQuantity>
              <div>{item.name}</div>
              <TicketItemPrice>${item.price * item.quantity}</TicketItemPrice>
            </TicketItem>
          ))}
        </TicketItems>

        <TicketTotal>
          <TicketInfoLabel>Total</TicketInfoLabel>
          <span></span>
          <TicketTotalValue>${total}</TicketTotalValue>
        </TicketTotal>
      </Ticket>

      {payMode && (
        <PaymentOptions>
          <PaymentOption
            $selected={paymentOption === "cash"}
            onClick={() => setPaymentOption("cash")}
          >
            <PaymentOptionIcon>
              <HiOutlineBanknotes />
            </PaymentOptionIcon>
            <div>Efectivo</div>
          </PaymentOption>
          <PaymentOption
            $selected={paymentOption === "bankTransfer"}
            onClick={() => setPaymentOption("bankTransfer")}
          >
            <PaymentOptionIcon>
              <HiOutlineCreditCard />
            </PaymentOptionIcon>
            <div>Transferencia</div>
          </PaymentOption>
        </PaymentOptions>
      )}

      {ticket.status !== "closed" && (
        <AcceptButton
          onClick={() => handlePrimaryButton(ticket.status)}
          backgroundColor={
            ticket.status === "open"
              ? "var(--color-brand-1000)"
              : "var(--color-gray-brand)"
          }
          marginTop="2rem"
          padding="2rem 1rem"
        >
          {ticket.status === "open" ? "Pagar" : "Cerrar"}
        </AcceptButton>
      )}

      {ticket.status !== "closed" && (
        <AcceptButton
          onClick={handleSecondaryButton}
          color="var(--color-gray-1000)"
          backgroundColor="var(--color-gray-300)"
          marginTop={ticket.status === "closed" ? "2rem" : ".7rem"}
        >
          {payMode ? "Cancelar" : "Editar"}
        </AcceptButton>
      )}

      {modal && (
        <ConfirmModal
          open={modal}
          setOpen={setModal}
          message={
            ticket.status === "open" ? (
              <div>
                ¿Seguro que deseas <span>pagar</span> el ticket con
                <span>
                  {" "}
                  {
                    TICKET_PAYMENT_OPTIONS.find(
                      (option) => option.key === paymentOption
                    ).label[LANG]
                  }
                </span>
                ?
              </div>
            ) : (
              <div>
                ¿Seguro que deseas <span>cerrar</span> el ticket?
              </div>
            )
          }
          confirmButtonMessage={ticket.status === "open" ? "Pagar" : "Cerrar"}
          confirmButtonBackgroundColor={
            ticket.status === "open"
              ? "var(--color-brand-1000)"
              : "var(--color-gray-brand)"
          }
          handleConfirm={handleChangeTicketStatus}
        />
      )}

      <Loading open={loading} />
    </SlidingWindow>
  );
}

export default TicketOverview;
