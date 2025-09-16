import { createContext, useContext, useState } from "react";
import { useItemsData } from "../features/items/useItemsData";

const ItemsContext = createContext();

function ItemsProvider({ children }) {
  const [ticketItems, setTicketItems] = useState({});
  const [search, setSearch] = useState("");
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    "Todos los productos"
  );
  const filteredItems = useItemsData(search, selectedDropdownItem);
  const [initialTicketItems, setInitialTicketItems] = useState({});

  return (
    <ItemsContext.Provider
      value={{
        ticketItems,
        setTicketItems,
        selectedDropdownItem,
        setSelectedDropdownItem,
        search,
        setSearch,
        filteredItems,
        initialTicketItems,
        setInitialTicketItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined)
    throw new Error("ItemsContext was used outside of ItemsProvider");
  return context;
}

export { ItemsProvider, useItems };
