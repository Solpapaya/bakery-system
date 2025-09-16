import { createContext, useContext } from "react";
import { useTicketsData } from "../features/tickets/useTicketsData";
import { useSearchParams } from "react-router-dom";

const TicketsContext = createContext();

function TicketsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const { filteredTickets, statusCounts } = useTicketsData(searchParams);

  return (
    <TicketsContext.Provider value={{ filteredTickets, statusCounts }}>
      {children}
    </TicketsContext.Provider>
  );
}

function useTickets() {
  const context = useContext(TicketsContext);
  if (context === undefined)
    throw new Error("TicketsContext was used outside of TicketsProvider");

  return context;
}

export { TicketsProvider, useTickets };
