import { createContext, useContext, useState } from "react";
import { getDateShortcut, getDaysLeft } from "../utils/helpers";

const DateContext = createContext();

function DateProvider({ children }) {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const formattedDeliveryDate = deliveryDate?.toISOString().split("T")[0];
  const dateShortcut = getDateShortcut(formattedDeliveryDate);
  const [initialDeliveryDate, setInitialDeliveryDate] = useState(null);
  const initialFormattedDeliveryDate = initialDeliveryDate
    ?.toISOString()
    .split("T")[0];
  const daysLeft = getDaysLeft(formattedDeliveryDate);

  return (
    <DateContext.Provider
      value={{
        formattedDeliveryDate,
        setDeliveryDate,
        dateShortcut,
        initialFormattedDeliveryDate,
        setInitialDeliveryDate,
        daysLeft,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

function useDate() {
  const context = useContext(DateContext);
  if (context === undefined)
    throw Error("DateContext was used outside of DateProvider");
  return context;
}

export { DateProvider, useDate };
