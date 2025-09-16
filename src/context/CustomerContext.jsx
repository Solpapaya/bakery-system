import { createContext, useContext, useState } from "react";
import { useCustomers } from "../features/customers/useCustomers";

const CustomerContext = createContext();

function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState("");
  const [search, setSearch] = useState("");
  const filteredCustomers = useCustomers(search);
  const [initialCustomer, setInitialCustomer] = useState("");

  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer,
        search,
        setSearch,
        filteredCustomers,
        initialCustomer,
        setInitialCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined)
    throw Error("CustomerContext was used outside of CustomerProvider");
  return context;
}

export { CustomerProvider, useCustomer };
