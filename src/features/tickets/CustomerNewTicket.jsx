import styled, { css } from "styled-components";
import SlidingWindow from "../../ui/SlidingWindow";
import { mqHeight } from "../../utils/mediaQueryHelpers";
import { useEffect, useState } from "react";
import CustomerItem from "../../ui/CustomerItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import Search from "../../ui/Search";
import { MessageTypes } from "../../constants/messageTypes";
import MessageSvg from "../../ui/MessageSvg";

const Wrapper = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CreateCustomerButton = styled.button`
  width: 100%;
  border-radius: var(--border-radius-md);
  text-transform: uppercase;
  padding: 1rem;
  font-size: 1.4rem;
  background-color: var(--color-gray-200);
  color: var(--color-brand-1000);
  font-weight: 400;
  border: none;
`;

const CustomerListContainer = styled.div`
  border-top: 1.2px solid var(--color-gray-300);
  padding-top: 1rem;
`;

const CustomerListTitle = styled.div`
  color: var(--color-brand-1000);

  font-size: 1.4rem;
  font-weight: 400;
  padding-bottom: 1rem;
`;

const CustomerList = styled.ul`
  overflow-y: auto;
  height: 50dvh;

  @media ${mqHeight.iphone15Pro} {
    height: 66dvh;
  }

  ${(props) =>
    props.$isSearching &&
    css`
      height: 55dvh;

      @media ${mqHeight.iphone15Pro} {
        height: 69.25dvh;
      }
    `}
`;

const MessageWrapper = styled.div`
  overflow-y: auto;
  height: 55dvh;

  @media ${mqHeight.iphone15Pro} {
    height: 69.25dvh;
  }
`;

const AcceptButton = styled.button`
  background-color: var(--color-brand-1000);
  color: var(--color-gray-0);
  border: none;
  padding: 1rem 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  margin-top: 1.3rem;
  width: 100%;

  &:disabled {
    background-color: var(--color-gray-100);
  }
`;

function CustomerNewTicket() {
  const prevPath = useLocation().pathname.split("/").slice(0, -1).join("/");
  const { customer, setCustomer, search, setSearch, filteredCustomers } =
    useCustomer();
  const [localCustomer, setLocalCustomer] = useState(customer);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.paddingBottom = "0px";
    return () => (document.body.style.paddingBottom = "");
  }, []);

  useEffect(() => {
    return () => setSearch("");
  }, [setSearch]);

  function handleAccept() {
    setCustomer(localCustomer);
    navigate(prevPath);
  }

  return (
    <SlidingWindow
      previousPage={prevPath}
      headerText="Añadir Cliente al Ticket"
    >
      <Wrapper>
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Nombre del cliente"
          fixed={false}
        />
        <CreateCustomerButton>Crear nuevo cliente</CreateCustomerButton>

        <CustomerListContainer>
          {search === "" && filteredCustomers.length === 0 ? (
            <MessageWrapper>
              <MessageSvg
                type={MessageTypes.NEUTRAL}
                message="No has agregado ningún cliente aún."
              />
            </MessageWrapper>
          ) : (
            <>
              {search === "" && filteredCustomers.length > 0 && (
                <CustomerListTitle>Clientes frecuentes</CustomerListTitle>
              )}
              {filteredCustomers.length > 0 && (
                <CustomerList $isSearching={search !== ""}>
                  {filteredCustomers.map((customer) => (
                    <CustomerItem
                      key={customer.id}
                      customer={customer}
                      localCustomer={localCustomer}
                      setLocalCustomer={setLocalCustomer}
                    />
                  ))}
                </CustomerList>
              )}
              {search !== "" && filteredCustomers.length === 0 && (
                <MessageWrapper>
                  <MessageSvg
                    type={MessageTypes.NOT_FOUND}
                    message="Ups... No se encontraron clientes."
                  />
                </MessageWrapper>
              )}
              <AcceptButton
                disabled={localCustomer === ""}
                onClick={handleAccept}
              >
                Aceptar
              </AcceptButton>
            </>
          )}
        </CustomerListContainer>
      </Wrapper>
    </SlidingWindow>
  );
}

export default CustomerNewTicket;
