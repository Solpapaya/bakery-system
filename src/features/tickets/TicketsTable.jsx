// import styled from "styled-components";
import { useMobile } from "../../context/MobileContext";
import Table from "../../ui/Table";
import TicketRow from "./TicketRow";
import TicketRowMobile from "./TicketRowMobile";
import { useTickets } from "../../context/TicketsContext";

function TicketsTable() {
  const { isMobile } = useMobile();

  // Logic to make query to database with the data filters

  // Meanwhile, filter the data with all filters
  const { filteredTickets } = useTickets();

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 3rem">
      {!isMobile && (
        <Table.Header>
          <div>Ticket ID</div>
          <div>Cliente</div>
          <div>Fecha</div>
          <div>Total</div>
          <div># Productos</div>
          <div>Forma de Pago</div>
          <div>Estado</div>
        </Table.Header>
      )}

      <Table.Body>
        {isMobile
          ? filteredTickets.map((ticket) => (
              <TicketRowMobile ticket={ticket} key={ticket.id} />
            ))
          : filteredTickets.map((ticket) => (
              <TicketRow ticket={ticket} key={ticket.id} />
            ))}
      </Table.Body>
    </Table>
  );
}

export default TicketsTable;
