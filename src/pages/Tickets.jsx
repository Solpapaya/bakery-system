import { useMobile } from "../context/MobileContext";
import { TicketsProvider } from "../context/TicketsContext";
import TicketsTable from "../features/tickets/TicketsTable";
import TicketsTableOperations from "../features/tickets/TicketsTableOperations";
import TicketsTableOperationsMobile from "../features/tickets/TicketsTableOperationsMobile";
import CreateButton from "../features/tickets/CreateButton";
import { useEffect } from "react";
import { useScroll } from "../context/useScrollContext";

function Tickets() {
  const { isMobile } = useMobile();
  const { setTopMinScrollY } = useScroll();

  useEffect(() => {
    setTopMinScrollY(142);
  }, [setTopMinScrollY]);

  return (
    <>
      <TicketsProvider>
        {isMobile ? (
          <TicketsTableOperationsMobile />
        ) : (
          <TicketsTableOperations />
        )}
        <TicketsTable />
      </TicketsProvider>
      <CreateButton />
    </>
  );
}

export default Tickets;
