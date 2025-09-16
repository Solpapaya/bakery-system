import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineUserCircle,
  HiOutlineSlash,
  HiOutlineCheck,
} from "react-icons/hi2";
import { LuCroissant } from "react-icons/lu";
import SlidingWindow from "../../ui/SlidingWindow";
import ItemsCheckout from "../../ui/ItemsCheckout";
import { useItems } from "../../context/ItemsContext";
import AcceptButton from "../../ui/AcceptButton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCustomer } from "../../context/CustomerContext";
import { useDate } from "../../context/DateContext";
import { useScroll } from "../../context/useScrollContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Summary = styled.div`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-gray-300);
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const TitleIcon = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-55%);

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    display: block;
    color: var(--color-brand-1000);
    stroke-width: ${(props) => props.$strokeWidth};
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-gray-600);
  padding-left: 2rem;
`;

const Text = styled.div`
  color: var(--color-gray-700);
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  margin: 0 0.7rem;
  & svg {
    position: static;
    display: block;
    transform: translateY(0);
    stroke-width: 2.1;
    color: var(--color-brand-1000);
  }
`;

const TotalWrapper = styled.div`
  border-top: 5px dashed var(--color-gray-500);
  border-width: 6px;
  margin-top: 1rem;
`;

const Total = styled.div`
  margin-top: 2rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-gray-300);
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--color-brand-1000);
`;

const TicketConfirmed = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-items: center;
`;

const TicketConfirmedIconWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--color-green-1000);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    display: block;
    width: 3rem;
    height: 3rem;
    color: var(--color-gray-0);
    stroke-width: 3;
  }
`;

const TicketConfirmedTitle = styled.div`
  font-weight: 500;
  margin-top: 1rem;
`;

const TicketConfirmedOrder = styled.div`
  font-weight: 500;
  color: var(--color-gray-700);
  font-size: 1.5rem;
  margin-top: 0.2rem;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
`;

const NewTicketButton = styled.button`
  border: none;
  padding: 1rem 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
`;

const ShowTicketsButton = styled(NewTicketButton)`
  color: var(--color-gray-1000);
  background-color: transparent;
  outline: 1.5px solid var(--color-gray-700);
  outline-offset: -1.5px;
`;

function Checkout() {
  const { customer, setCustomer } = useCustomer();
  const { formattedDeliveryDate, setDeliveryDate, dateShortcut } = useDate();
  const { ticketItems, setTicketItems } = useItems();
  const total = Object.keys(ticketItems).reduce((acc, key) => {
    acc = ticketItems[key].quantity * ticketItems[key].price + acc;
    return acc;
  }, 0);
  const [isTicketCreated, setIsTicketCreated] = useState(false);
  const { setTopMinScrollY } = useScroll();

  const navigate = useNavigate();

  function handleCreateTicket() {
    toast.success("Ticket creado con éxito");
    setIsTicketCreated(true);
    window.scrollTo({ top: -100, behavior: "smooth" });
  }

  function handleNewTicket() {
    setCustomer("");
    setDeliveryDate(null);
    setTicketItems({});
    navigate("/tickets/new");
  }

  useEffect(() => {
    setTopMinScrollY(50);
  }, [setTopMinScrollY]);

  return (
    <SlidingWindow
      previousPage="/tickets/new"
      headerText="Checkout"
      header={!isTicketCreated}
    >
      {isTicketCreated && (
        <TicketConfirmed>
          <TicketConfirmedIconWrapper>
            <HiOutlineCheck />
          </TicketConfirmedIconWrapper>
          <TicketConfirmedTitle>Ticket Confirmado</TicketConfirmedTitle>
          <TicketConfirmedOrder>#00001</TicketConfirmedOrder>
        </TicketConfirmed>
      )}

      <Wrapper>
        <Summary>
          <TitleWrapper>
            <TitleIcon $strokeWidth="1.3">
              <HiOutlineUserCircle />
            </TitleIcon>
            <Title>Cliente</Title>
          </TitleWrapper>
          <Text>{customer}</Text>
        </Summary>

        <Summary>
          <TitleWrapper>
            <TitleIcon $strokeWidth="1">
              <HiOutlineCalendarDays />
            </TitleIcon>
            <Title>Fecha de Entrega</Title>
          </TitleWrapper>
          <Text>
            {dateShortcut && (
              <>
                <span>{dateShortcut}</span>
                <IconWrapper>
                  <HiOutlineSlash />
                </IconWrapper>
              </>
            )}
            <span>{formattedDeliveryDate}</span>
          </Text>
        </Summary>

        <Summary>
          <TitleWrapper>
            <TitleIcon $strokeWidth="1">
              <LuCroissant />
            </TitleIcon>
            <Title>Productos</Title>
          </TitleWrapper>
          <ItemsCheckout />
        </Summary>

        <TotalWrapper>
          <Total>
            <span>Total</span>
            <span>${total}</span>
          </Total>
        </TotalWrapper>
      </Wrapper>

      {isTicketCreated ? (
        <ButtonsWrapper>
          <NewTicketButton onClick={handleNewTicket}>
            Nuevo Ticket
          </NewTicketButton>
          <ShowTicketsButton
            onClick={() => {
              // scrollToTop();
              navigate("/tickets");
            }}
          >
            Ver Tickets
          </ShowTicketsButton>
        </ButtonsWrapper>
      ) : (
        <AcceptButton
          marginTop="4rem"
          marginBottom="1rem"
          onClick={handleCreateTicket}
        >
          Crear Ticket
        </AcceptButton>
      )}
    </SlidingWindow>
  );
}

export default Checkout;
